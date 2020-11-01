from lct.groups.models import Group

from .models import AssignTask


class AssignStudentTask:
    @classmethod
    def call(cls, task, student):
        AssignTask.objects.create(task=task, student=student)


class AssignGroupTask:
    @classmethod
    def call(cls, task, group: Group):
        for student in group.students.all():
            AssignStudentTask.call(task=task, student=student)


class AssignTasks:
    @classmethod
    def call(cls, tasks, groups, students):
        for task in tasks:
            for student in students:
                AssignStudentTask.call(task, student)
            for group in groups:
                AssignGroupTask.call(task, group)
