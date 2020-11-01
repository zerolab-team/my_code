from django.urls import path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

schema_view = get_schema_view(
    public=True,
    info=openapi.Info(
        title="LCT API",
        default_version="v1",
        description="API Doc для LCT",
    ),
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path(
        "docs/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema_swagger_view",
    ),
]
