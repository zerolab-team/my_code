# Generated by Django 3.0.10 on 2020-10-31 14:34

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('task_dispatching', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dispatch',
            name='sent_dt',
            field=models.DateTimeField(default=django.utils.timezone.now, verbose_name='Время отправки'),
        ),
    ]