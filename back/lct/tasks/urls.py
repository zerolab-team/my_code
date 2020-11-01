from django.urls import include, path
from rest_framework_nested import routers

from . import views

router = routers.SimpleRouter()
router.register("tasks", views.TaskViewSet)

tasks_router = routers.NestedSimpleRouter(router, "tasks", lookup="task")
tasks_router.register("samples", views.SampleViewSet, basename="task_samples")
tasks_router.register("in_out_tests", views.InOutTestViewSet, basename="in_out_tests")
tasks_router.register("check_tests", views.CheckerTestViewSet, basename="checker_tests")

app_name = "tasks"

urlpatterns = [
    path("", include(router.urls)),
    path("", include(tasks_router.urls)),
]
