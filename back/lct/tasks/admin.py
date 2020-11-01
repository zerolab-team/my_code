from django.contrib import admin

from .models import CheckerTest, InOutTest, Task, TaskSample


class TaskSampleInline(admin.TabularInline):
    model = TaskSample
    fields = []


class InOutTestInline(admin.TabularInline):
    model = InOutTest


class CheckerTestInline(admin.StackedInline):
    model = CheckerTest


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ["name"]
    inlines = [TaskSampleInline, InOutTestInline, CheckerTestInline]
