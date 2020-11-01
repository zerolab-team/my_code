from django.db import models


class Ordered(models.Model):
    order = models.PositiveSmallIntegerField(editable=False)

    class Meta:
        abstract = True
        ordering = ["order"]

    def save(
        self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        if self.order is None:
            last = self.__class__.objects.last()
            self.order = last.order + 1 if last is not None else 0
        super().save(
            force_insert=force_insert,
            force_update=force_update,
            using=using,
            update_fields=update_fields,
        )
