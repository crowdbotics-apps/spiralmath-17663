# Generated by Django 2.2.14 on 2020-07-31 10:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_user_emailconfirmationtoken'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.CharField(max_length=50, unique=True, verbose_name='Email'),
        ),
    ]
