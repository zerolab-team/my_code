from time import sleep

from celery import shared_task

from lct.languages.models import get_language_by_name
from lct.tasks.models import CheckerTest, InOutTest

from .models import Dispatch, TestStatuses
from .test_runners import CheckerTestRunner, InOutTestRunner


def filter_in_out_results(results):
    ret = []
    for result in results:
        try:
            ret.append((InOutTest.objects.get(id=result.test.id), result))
        except InOutTest.DoesNotExist:
            pass
    return ret


def filter_checker_results(results):
    ret = []
    for result in results:
        try:
            ret.append((CheckerTest.objects.get(id=result.test.id), result))
        except CheckerTest.DoesNotExist:
            pass
    return ret


@shared_task
def test_dispatch(dispatch_id):
    sleep(1)
    dispatch = Dispatch.objects.get(id=dispatch_id)
    lang = get_language_by_name(dispatch.lang)
    test_results = dispatch.testresult_set.all()
    inout_results = filter_in_out_results(test_results)
    checker_results = filter_checker_results(test_results)
    test_results = inout_results + checker_results
    results = InOutTestRunner(
        [test_result[0] for test_result in inout_results],
        code=dispatch.code,
        executor_class=lang.executor_class,
    ).test_all()
    results += CheckerTestRunner(
        [test_result[0] for test_result in checker_results],
        code=dispatch.code,
        executor_class=lang.executor_class,
    ).test_all()
    for test_result, result in zip(test_results, results):
        test_result = test_result[1]
        test_result.status = result.status
        test_result.exec_time = result.exec_time
        test_result.data_in = result.data_in
        test_result.data_out = result.data_out
        test_result.save()
    num_passed = sum(
        [test.status == TestStatuses.OK for test in dispatch.testresult_set.all()]
    )
    num_tests = dispatch.testresult_set.count()
    score = num_passed / num_tests * 100
    if score == 100:
        dispatch.status = Dispatch.Statuses.OK
    else:
        dispatch.status = Dispatch.Statuses.ERROR
    dispatch.score = score
    dispatch.save()
