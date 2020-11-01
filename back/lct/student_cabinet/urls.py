from django.urls import path

from . import views

urlpatterns = [
    path("assign_tasks/", views.AssignTaskListView.as_view(), name="assign_task_list"),
    path(
        "assign_tasks/<int:pk>/",
        views.AssignTaskRetrieveView.as_view(),
        name="assign_task_detail",
    ),
    path(
        "assign_tasks/<int:pk>/send_dispatch/",
        views.SendDispatchView.as_view(),
        name="send_dispatch",
    ),
    path(
        "assign_tasks/<int:pk>/dispatches/",
        views.DispatchListView.as_view(),
        name="dispatch_list",
    ),
    path(
        "assign_tasks/<int:pk>/dispatches/<int:dispatch_pk>/",
        views.DispatchRetrieveView.as_view(),
        name="dispatch_retrieve",
    ),
]
