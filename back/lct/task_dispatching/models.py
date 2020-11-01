from django.db import models
from django.utils import timezone

from lct.languages.models import get_language_choices
from lct.utils.choices import count_max_length


class TestStatuses(models.TextChoices):
    OK = "ok", "OK"
    TO = "to", "TO"
    WA = "wa", "WA"
    MO = "mo", "MO"
    RE = "re", "RE"
    CE = "ce", "CE"
    BC = "bc", "BC"


class Dispatch(models.Model):
    task = models.ForeignKey("assign_tasks.AssignTask", on_delete=models.CASCADE)
    code = models.TextField("Код")
    lang = models.CharField(
        "Язык",
        max_length=count_max_length(get_language_choices()),
        choices=get_language_choices(),
    )

    class Statuses(models.TextChoices):
        OK = "ok", "OK"
        CHECK = "check", "CHECK"
        ERROR = "error", "ERROR"

    status = models.CharField("Статус", max_length=5, choices=Statuses.choices)
    sent_dt = models.DateTimeField("Время отправки", default=timezone.now)
    score = models.PositiveSmallIntegerField("Кол-во баллов", null=True)

    @property
    def exec_time(self):
        res = 0
        for test_result in self.testresult_set.all():
            if test_result.exec_time is not None:
                res += test_result.exec_time
        return res

    class Meta:
        verbose_name = "Отправка"
        verbose_name_plural = "Отправки"
        ordering = ["-sent_dt"]


class TestResult(models.Model):
    test = models.ForeignKey("tasks.Test", on_delete=models.CASCADE)
    dispatch = models.ForeignKey("Dispatch", on_delete=models.CASCADE)
    status = models.CharField(
        "Статус", choices=TestStatuses.choices, max_length=15, null=True
    )
    exec_time = models.PositiveIntegerField("Время выполнения (в мс)", null=True)
    data_in = models.TextField()
    data_out = models.TextField()

    class Meta:
        verbose_name = "Результат теста"
        verbose_name_plural = "Результаты тестов"
        ordering = ["test__order"]
