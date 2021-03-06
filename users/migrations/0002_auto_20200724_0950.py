# Generated by Django 2.2.12 on 2020-07-24 09:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='name',
        ),
        migrations.AddField(
            model_name='user',
            name='accepted_terms_date',
            field=models.DateTimeField(blank=True, null=True, verbose_name='Accepted Terms date'),
        ),
        migrations.AddField(
            model_name='user',
            name='status',
            field=models.PositiveSmallIntegerField(choices=[(10, 'Active'), (20, 'Invitation'), (30, 'Inactive')], default=30, verbose_name='Status'),
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.CharField(max_length=50, verbose_name='Email'),
        ),
        migrations.AlterField(
            model_name='user',
            name='first_name',
            field=models.CharField(max_length=50, verbose_name='First Name'),
        ),
        migrations.AlterField(
            model_name='user',
            name='last_name',
            field=models.CharField(max_length=50, verbose_name='Last Name'),
        ),
    ]
