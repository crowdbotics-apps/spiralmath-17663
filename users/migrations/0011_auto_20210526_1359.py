# Generated by Django 2.2.22 on 2021-05-26 13:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0010_auto_20210526_1345'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('Admin', 'Admin'), ('Editor', 'Editor'), ('LeadTeacher', 'Lead Teacher'), ('AssistTeacher', 'Assist Teacher'), ('Student', 'Student'), ('SchoolBoss', 'School boss'), ('DistrictBoss', 'District boss')], default='Editor', max_length=20, verbose_name='Role'),
        ),
    ]