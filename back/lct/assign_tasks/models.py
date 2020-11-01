from django.db import models
from django.utils import timezone


class AssignTask(models.Model):
    student = models.ForeignKey("users.User", on_delete=models.CASCADE)
    task = models.ForeignKey("tasks.Task", on_delete=models.CASCADE)
    is_solved = models.BooleanField(default=False)
    assign_dt = models.DateTimeField(default=timezone.now)

    @property
    def status(self):
        return self.dispatch_set.first().status

    @property
    def score(self):
        return self.dispatch_set.first().score

    class Meta:
        verbose_name = "Назначенная задача"
        verbose_name_plural = "Назначенные задачи"
        ordering = ["-assign_dt"]
