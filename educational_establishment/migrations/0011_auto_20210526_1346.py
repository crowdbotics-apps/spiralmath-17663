# Generated by Django 2.2.22 on 2021-05-26 13:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('educational_establishment', '0010_auto_20210526_1345'),
    ]

    operations = [
        migrations.AlterField(
            model_name='leadteacher',
            name='user',
            field=models.ForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
