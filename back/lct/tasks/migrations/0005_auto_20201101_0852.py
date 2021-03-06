# Generated by Django 3.0.10 on 2020-11-01 05:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0004_auto_20201101_0850'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='checkertest',
            name='id',
        ),
        migrations.RemoveField(
            model_name='checkertest',
            name='order',
        ),
        migrations.RemoveField(
            model_name='checkertest',
            name='task',
        ),
        migrations.RemoveField(
            model_name='inouttest',
            name='id',
        ),
        migrations.RemoveField(
            model_name='inouttest',
            name='order',
        ),
        migrations.RemoveField(
            model_name='inouttest',
            name='task',
        ),
        migrations.CreateModel(
            name='Test',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveSmallIntegerField(editable=False)),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tasks.Task')),
            ],
            options={
                'ordering': ['order'],
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='checkertest',
            name='test_ptr',
            field=models.OneToOneField(auto_created=True, default=1, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='tasks.Test'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='inouttest',
            name='test_ptr',
            field=models.OneToOneField(auto_created=True, default=1, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='tasks.Test'),
            preserve_default=False,
        ),
    ]
