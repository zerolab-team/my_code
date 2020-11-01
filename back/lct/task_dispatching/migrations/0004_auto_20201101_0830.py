# Generated by Django 3.0.10 on 2020-11-01 05:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('task_dispatching', '0003_auto_20201101_0335'),
    ]

    operations = [
        migrations.AddField(
            model_name='testresult',
            name='data_in',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='testresult',
            name='data_out',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='testresult',
            name='exec_time',
            field=models.PositiveIntegerField(null=True, verbose_name='Время выполнения (в мс)'),
        ),
        migrations.AlterField(
            model_name='testresult',
            name='status',
            field=models.CharField(choices=[('ok', 'OK'), ('to', 'TO'), ('wa', 'WA'), ('mo', 'MO'), ('re', 'RE'), ('ce', 'CE'), ('bc', 'BC')], max_length=15, null=True, verbose_name='Статус'),
        ),
    ]
