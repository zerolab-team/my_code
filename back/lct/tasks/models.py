from django.db import models

from lct.languages.models import get_language_choices
from lct.utils.choices import count_max_length
from lct.utils.ordered import Ordered


class Task(models.Model):
    name = models.CharField("Название", max_length=240)
    legend = models.TextField("Легенда")
    condition = models.TextField("Условие")

    class Meta:
        verbose_name = "Задача"
        verbose_name_plural = "Задачи"

    def __str__(self):
        return self.name


class TaskSample(models.Model):
    data_in = models.TextField("Вход", blank=True)
    data_out = models.TextField("Выход", blank=True)
    task = models.ForeignKey(
        "Task", on_delete=models.CASCADE, related_name="sample_set"
    )

    class Meta:
        verbose_name = "Пример"
        verbose_name_plural = "Примеры"

    def __str__(self):
        return f"{self.task.name}"


class Test(Ordered, models.Model):
    task = models.ForeignKey("Task", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.task.name} #{self.order}"


class InOutTest(Test):
    data_in = models.TextField("Вход", blank=True)
    data_out = models.TextField("Выход", blank=True)

    class Meta:
        verbose_name = 'Тест типа "Ввод-Вывод"'
        verbose_name_plural = 'Тесты типа "Ввод-Вывод"'


class CheckerTest(Test):
    lang = models.CharField(
        "Язык",
        max_length=count_max_length(get_language_choices()),
        choices=get_language_choices(),
    )
    code = models.TextField("Код")

    class Meta:
        verbose_name = 'Тест типа "Чекер"'
        verbose_name_plural = 'Тест типа "Чекер"'
