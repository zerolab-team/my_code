from django.contrib import admin

from .models import Dispatch, TestResult


class TestResultInline(admin.TabularInline):
    model = TestResult

    def has_add_permission(self, request, obj):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def has_change_permission(self, request, obj=None):
        return False


@admin.register(Dispatch)
class DispatchAdmin(admin.ModelAdmin):
    inlines = [TestResultInline]
