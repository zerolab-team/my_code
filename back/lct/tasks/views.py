from django.shortcuts import get_object_or_404
from rest_framework import viewsets

from lct.users.permissions import IsStaff

from .models import Task
from .serializers import (
    CheckerTestSerializer,
    InOutTestSerializer,
    TaskSampleSerializer,
    TaskSerializer,
)


class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = [IsStaff]
    serializer_class = TaskSerializer
    queryset = Task.objects.all()


class TaskMixin:
    def get_task(self):
        return get_object_or_404(Task, pk=self.kwargs["task_pk"])

    def perform_create(self, serializer):
        serializer.save(task=self.get_task())


class SampleViewSet(TaskMixin, viewsets.ModelViewSet):
    serializer_class = TaskSampleSerializer
    permission_classes = [IsStaff]

    def get_queryset(self):
        return self.get_task().sample_set.all()


class InOutTestViewSet(TaskMixin, viewsets.ModelViewSet):
    serializer_class = InOutTestSerializer
    permission_classes = [IsStaff]

    def get_queryset(self):
        return self.get_task().inouttest_set.all()


class CheckerTestViewSet(TaskMixin, viewsets.ModelViewSet):
    serializer_class = CheckerTestSerializer
    permission_classes = [IsStaff]

    def get_queryset(self):
        return self.get_task().checkertest_set.all()
