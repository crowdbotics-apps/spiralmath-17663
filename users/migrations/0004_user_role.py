# Generated by Django 2.2.12 on 2020-07-24 12:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20200724_1117'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('Admin', 'Admin'), ('Editor', 'Editor')], default='Editor', max_length=20, verbose_name='Role'),
        ),
    ]
