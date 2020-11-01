from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from lct.users.permissions import IsStaff

from .serializers import AssignTaskSerializer
from .services import AssignTasks


class AssignTaskView(APIView):
    permission_classes = [IsStaff]

    def get_serializer(self, *args, **kwargs):
        return AssignTaskSerializer(*args, **kwargs)

    @swagger_auto_schema(
        responses={
            status.HTTP_204_NO_CONTENT: openapi.Response(""),
        }
    )
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        AssignTasks.call(
            serializer.validated_data["tasks"],
            serializer.validated_data["groups"],
            serializer.validated_data["students"],
        )
        return Response(status=status.HTTP_204_NO_CONTENT)
