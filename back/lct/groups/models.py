from django.db import models


class Group(models.Model):
    name = models.CharField("Название", max_length=240)
    students = models.ManyToManyField("users.User")

    class Meta:
        verbose_name = "Группа"
        verbose_name_plural = "Группы"
