# Generated by Django 2.2.22 on 2021-05-11 17:52

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    dependencies = [
        ('educational_establishment', '0002_auto_20210511_1743'),
    ]

    operations = [
        migrations.CreateModel(
            name='Class',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('memo', models.TextField(blank=True, default='')),
                ('is_active', models.BooleanField(default=True)),
                ('name', models.CharField(max_length=200)),
                ('grade', models.CharField(max_length=200)),
                ('subject', models.TextField()),
                ('period', models.CharField(max_length=200)),
                ('location', models.CharField(max_length=200)),
                ('year', models.CharField(max_length=200)),
                ('classroom_mode', models.BooleanField(default=True)),
                ('quiz_repeat_mode', models.BooleanField(default=False)),
                ('homework_mode', models.BooleanField(default=False)),
                ('parents_notify_mode', models.BooleanField(default=False)),
                ('lead_teacher', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='leading_classes', to='educational_establishment.Teacher')),
                ('school', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='educational_establishment.School')),
                ('teacher', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='educational_establishment.Teacher')),
            ],
            options={
                'verbose_name': 'class',
                'verbose_name_plural': 'classes',
            },
        ),
        migrations.CreateModel(
            name='ClassRoll',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('memo', models.TextField(blank=True, default='')),
                ('is_active', models.BooleanField(default=True)),
                ('class_ref', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='educational_establishment.Class')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='educational_establishment.Student')),
            ],
            options={
                'verbose_name': 'class roll',
            },
        ),
    ]
