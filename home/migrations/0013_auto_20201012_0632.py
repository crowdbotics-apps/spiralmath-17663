# Generated by Django 2.2.15 on 2020-10-12 06:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0012_question_reviewer_feedback'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='deleted',
            field=models.BooleanField(default=False, verbose_name='Deleted'),
        ),
        migrations.AddField(
            model_name='question',
            name='deleted_status',
            field=models.BooleanField(default=False, verbose_name='Deleted Status'),
        ),
    ]
