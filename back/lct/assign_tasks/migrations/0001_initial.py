# Generated by Django 3.0.10 on 2020-10-31 09:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tasks', '0003_auto_20201031_1115'),
    ]

    operations = [
        migrations.CreateModel(
            name='AssignTask',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_solved', models.BooleanField(default=False)),
                ('status', models.CharField(blank=True, max_length=240, null=True, verbose_name='Статус')),
                ('assign_dt', models.DateTimeField(default=django.utils.timezone.now)),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tasks.Task')),
            ],
            options={
                'verbose_name': 'Назначенная задача',
                'verbose_name_plural': 'Назначенные задачи',
            },
        ),
    ]