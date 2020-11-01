from lct.assign_tasks.models import AssignTask

from .models import Dispatch
from .tasks import test_dispatch


class DispatchSolution:
    @classmethod
    def call(cls, assign_task: AssignTask, lang: str, code: str):
        print(code)
        dispatch = Dispatch.objects.create(task=assign_task, code=code, lang=lang)
        tests = assign_task.task.test_set.all()
        for test in tests:
            dispatch.testresult_set.create(test=test)
        test_dispatch.delay(dispatch_id=dispatch.id)
        return dispatch
