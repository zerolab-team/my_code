import threading
import time
from dataclasses import dataclass
from datetime import timedelta

from django.utils import timezone

from lct.languages.executors import CompilationError
from lct.languages.models import get_language_by_name

from .models import TestStatuses


@dataclass
class TestResult:
    data_in: str
    data_out: str
    exec_time: timedelta = 0
    status: TestStatuses = TestStatuses.OK

    @property
    def passed(self):
        return self.status == TestStatuses.OK


class TestError(Exception):
    def __init__(self, data_in, data_out):
        self.data_in = data_in
        self.data_out = data_out


class IncorrectResult(TestError):
    pass


class RuntimeTestError(TestError):
    pass


class TimeoutTestError(TestError):
    pass


class BadChecker(TestError):
    pass


class BaseTestRun(threading.Thread):
    def __init__(self, *args, test, executor, **kwargs):
        super().__init__(*args, **kwargs)
        self.exc = None
        self.result = None
        self.test = test
        self.executor = executor
        self.is_finished = False

    def perform_test(self, test):
        raise NotImplementedError

    def run(self):
        ex = self.executor.exec()
        try:
            self.result = self.perform_test(ex)
        except TestError as exc:
            self.exc = exc
        finally:
            ex.stop()

    def stop(self):
        self.is_finished = True


class InOutTestRun(BaseTestRun):
    def perform_test(self, ex):
        ex.write(self.test.data_in)
        reads = []
        while ex.get_exit_code() is None:
            if self.is_finished:
                raise TimeoutTestError(data_in="", data_out="")
            reads.append(ex.read())
        exit_code = ex.get_exit_code()
        reads.append(ex.read())
        read = "".join(reads)
        if exit_code == 0:
            normalized_expected = self.test.data_out.rstrip().replace("\r", "")
            normalized_output = read.rstrip().replace("\r", "")
            if normalized_output == normalized_expected:
                result = TestResult(
                    data_in=self.test.data_in, data_out=self.test.data_out
                )
            else:
                raise IncorrectResult(self.test.data_in, read)
        else:
            raise RuntimeTestError(self.test.data_in, read)
        return result


class BaseTestRunner:
    test_run_class = None

    def __init__(self, tests, code, executor_class, timeout=5, memory=128):
        self.executor_class = executor_class
        self.code = code
        self.tests = tests
        self.executor = None
        self.memory = memory
        self.timeout = timeout

    def test(self, test):
        run = self.test_run_class(test=test, executor=self.executor)
        start_dt = timezone.now()
        run.start()
        run.join(timeout=self.timeout)
        if run.is_alive():
            run.stop()
            run.join()
        end_dt = timezone.now()
        exec_time = (end_dt - start_dt).total_seconds() * 1000
        if run.result is not None:
            run.result.exec_time = exec_time
            return run.result
        if isinstance(run.exc, TimeoutTestError):
            return TestResult(
                data_in=run.exc.data_in,
                data_out=run.exc.data_out,
                status=TestStatuses.TO,
                exec_time=exec_time,
            )
        elif isinstance(run.exc, IncorrectResult):
            return TestResult(
                data_in=run.exc.data_in,
                data_out=run.exc.data_out,
                status=TestStatuses.WA,
                exec_time=exec_time,
            )
        elif isinstance(run.exc, RuntimeTestError):
            return TestResult(
                data_in=run.exc.data_in,
                data_out=run.exc.data_out,
                status=TestStatuses.RE,
                exec_time=exec_time,
            )

    def test_all(self):
        results = []
        try:
            self.executor = self.executor_class(self.code, memory=self.memory)
        except CompilationError:
            for _ in self.tests:
                results.append(
                    TestResult(data_in="", data_out="", status=TestStatuses.CE)
                )
            return results
        for test in self.tests:
            results.append(self.test(test))
        self.executor.stop()
        return results


class InOutTestRunner(BaseTestRunner):
    test_run_class = InOutTestRun


class CheckerTestRun(BaseTestRun):
    def perform_test(self, ex):
        lang = get_language_by_name(self.test.lang)
        executor = lang.executor_class(self.test.code)
        test_ex = executor.exec()

        outs = []
        test_outs = []
        while ex.get_exit_code() is None and test_ex.get_exit_code() is None:
            if self.is_finished:
                raise TimeoutTestError(data_in="", data_out="")
            test_out = test_ex.read()
            if test_out:
                test_outs.append(test_out)
                ex.write(test_out)
            out = ex.read()
            if out:
                outs.append(out)
                test_ex.write(out)
        time.sleep(0.2)
        out = ex.read()
        if out:
            outs.append(out)
            if test_ex.get_exit_code() is None:
                test_ex.write(out)
                time.sleep(0.3)
        outs.append(ex.read())
        test_outs.append(test_ex.read())
        out = "".join(outs)
        test_out = "".join(test_outs)
        exit_code = ex.get_exit_code()
        test_exit_code = ex.get_exit_code()

        test_ex.stop()
        executor.stop()

        if exit_code != 0 and exit_code is not None:
            raise RuntimeTestError(data_in=test_out, data_out=out)
        if test_exit_code == 0:
            if "ok" in test_out:
                return TestResult(data_in=test_out, data_out=out)
            elif "error" in test_out:
                raise IncorrectResult(data_in=test_out, data_out=out)
            else:
                raise BadChecker(data_in=test_out, data_out=out)
        if test_exit_code != 0 and test_exit_code is not None:
            raise BadChecker(data_in=test_out, data_out=out)
        if test_exit_code is None:
            if "ok" in test_out:
                return TestResult(data_in=test_out, data_out=out)
            elif "error" in test_out:
                raise IncorrectResult(data_in=test_out, data_out=out)
            else:
                raise IncorrectResult(data_in=test_out, data_out=out)

        if exit_code == 0 and test_exit_code == 0:
            if "ok" in test_out:
                return TestResult(data_in=test_out, data_out=out)
            elif "error" in test_out:
                raise IncorrectResult(data_in=test_out, data_out=out)
            else:
                raise BadChecker(data_in=test_out, data_out=out)
        elif exit_code != 0:
            raise RuntimeTestError(data_in=test_out, data_out=out)
        else:
            raise BadChecker(data_in=test_out, data_out=out)


class CheckerTest:
    def __init__(self, code, executor_class):
        self.code = code
        self.executor_class = executor_class

    def get_executor(self):
        return self.executor_class(self.code)


class CheckerTestRunner(BaseTestRunner):
    test_run_class = CheckerTestRun
