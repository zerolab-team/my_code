from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, parsers, status
from rest_framework.response import Response

from lct.assign_tasks.models import AssignTask
from lct.task_dispatching.models import Dispatch
from lct.task_dispatching.services import DispatchSolution
from lct.users.permissions import IsStudent

from .serializers import (
    AssignedTaskSerializer,
    DispatchSerializer,
    MakeDispatchSerializer,
)


class AssignTaskMixin:
    permission_classes = [IsStudent]

    def get_queryset(self):
        return AssignTask.objects.filter(student=self.request.user)


class AssignTaskListView(AssignTaskMixin, generics.ListAPIView):
    serializer_class = AssignedTaskSerializer


class AssignTaskRetrieveView(AssignTaskMixin, generics.RetrieveAPIView):
    serializer_class = AssignedTaskSerializer


class SendDispatchView(AssignTaskMixin, generics.GenericAPIView):
    serializer_class = MakeDispatchSerializer
    parser_classes = [parsers.MultiPartParser]

    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: openapi.Response(
                "",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        "id": openapi.Schema(type=openapi.TYPE_INTEGER),
                    },
                ),
            )
        }
    )
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        file = serializer.validated_data.get("file")
        if file:
            code = file.read().decode("utf-8")
        else:
            code = serializer.validated_data["code"]
        dispatch = DispatchSolution.call(
            self.get_object(), serializer.validated_data["lang"], code
        )
        return Response(
            {
                "id": dispatch.id,
            }
        )


class DispatchMixin(AssignTaskMixin):
    def get_queryset(self):
        tasks = super().get_queryset()
        task = get_object_or_404(tasks, pk=self.kwargs["pk"])
        return Dispatch.objects.filter(task=task)


class DispatchListView(DispatchMixin, generics.ListAPIView):
    serializer_class = DispatchSerializer


class DispatchRetrieveView(DispatchMixin, generics.RetrieveAPIView):
    serializer_class = DispatchSerializer

    def get_object(self):
        return get_object_or_404(self.get_queryset(), pk=self.kwargs["dispatch_pk"])
