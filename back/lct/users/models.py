from django.contrib.auth.models import AbstractUser as _User
from django.contrib.auth.models import UserManager as _UserManager
from django.db import models

from lct.utils.choices import count_max_length


class UserManager(_UserManager):
    use_in_migrations = True

    def create_superuser(self, username, email=None, password=None, **extra_fields):
        extra_fields["role"] = User.Roles.ADMIN
        return self._create_user(
            username, email=email, password=password, **extra_fields
        )


class User(_User):
    class Roles(models.TextChoices):
        STUDENT = "student", "Студент"
        TEACHER = "teacher", "Преподаватель"
        ADMIN = "admin", "Администратор"

    email = models.EmailField("Email")
    role = models.CharField(
        "Роль",
        max_length=count_max_length(Roles.choices),
        choices=Roles.choices,
        default=Roles.STUDENT,
    )

    first_name = None
    last_name = None
    user_permissions = None
    groups = None

    full_name = models.CharField("ФИО", max_length=240)
    birth_date = models.DateField("Дата рождения")
    educ_org = models.CharField("Образовательная организация", max_length=240)

    objects = UserManager()

    REQUIRED_FIELDS = ["email", "full_name", "birth_date", "educ_org"]

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

    @property
    def is_staff(self):
        return self.role == self.Roles.ADMIN

    @property
    def is_superuser(self):
        return self.role == self.Roles.ADMIN
