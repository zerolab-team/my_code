from django.contrib import admin

from .models import AssignTask


@admin.register(AssignTask)
class AssignTaskAdmin(admin.ModelAdmin):
    pass
