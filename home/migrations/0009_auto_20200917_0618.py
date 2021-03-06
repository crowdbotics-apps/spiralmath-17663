# Generated by Django 2.2.15 on 2020-09-17 06:18

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0008_messages_unread_counter'),
    ]

    operations = [
        migrations.AlterField(
            model_name='messages',
            name='content',
            field=django.contrib.postgres.fields.jsonb.JSONField(blank=True, default=dict, null=True),
        ),
        migrations.AlterField(
            model_name='messages',
            name='users',
            field=django.contrib.postgres.fields.jsonb.JSONField(default=list, unique=True),
        ),
    ]
