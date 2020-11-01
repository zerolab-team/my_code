from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as _UserAdmin

from .models import User


@admin.register(User)
class UserAdmin(_UserAdmin):
    filter_horizontal = []
    list_filter = []
    fieldsets = [
        (None, {"fields": ["username", "password", "role"]}),
        (
            "Персональная информация",
            {"fields": ["full_name", "email", "educ_org", "birth_date"]},
        ),
    ]
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": [
                    "full_name",
                    "email",
                    "educ_org",
                    "birth_date",
                    "username",
                    "password1",
                    "password2",
                ],
            },
        )
    ]
    list_display = ["full_name", "username", "educ_org", "role"]
