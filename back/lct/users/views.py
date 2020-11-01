from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, permissions, status
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken

from .serializers import MeSerializer


class LoginView(ObtainAuthToken):
    permission_classes = (permissions.AllowAny,)

    @swagger_auto_schema(
        request_body=AuthTokenSerializer,
        responses={
            status.HTTP_200_OK: openapi.Response(
                "",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        "token": openapi.Schema(type=openapi.TYPE_STRING),
                    },
                ),
            ),
        },
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class MeView(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = MeSerializer

    def get_object(self):
        return self.request.user
