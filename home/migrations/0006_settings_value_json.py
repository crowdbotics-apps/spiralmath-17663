# Generated by Django 2.2.15 on 2020-08-12 15:31

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0005_auto_20200727_0936'),
    ]

    operations = [
        migrations.AddField(
            model_name='settings',
            name='value_json',
            field=django.contrib.postgres.fields.jsonb.JSONField(blank=True, default=None, null=True),
        ),
    ]