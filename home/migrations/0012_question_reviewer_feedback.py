# Generated by Django 2.2.15 on 2020-10-01 06:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0011_auto_20200930_0713'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='reviewer_feedback',
            field=models.TextField(blank=True, null=True, verbose_name='Reviewer feedback'),
        ),
    ]
