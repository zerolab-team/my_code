from django.urls import path

from . import views

app_name = "assign_tasks"

urlpatterns = [
    path("assign-tasks/", views.AssignTaskView.as_view(), name="assign"),
]
