# Generated by Django 2.2.22 on 2021-05-26 15:23

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    dependencies = [
        ('quiz_framework', '0006_auto_20210507_1630'),
        ('educational_establishment', '0015_districtprincipal_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='ClassQuiz',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('memo', models.TextField(blank=True, default='')),
                ('is_active', models.BooleanField(default=True)),
                ('date_given', models.DateField(blank=True, null=True)),
                ('students_completed', models.IntegerField(blank=True, null=True)),
                ('quiz_now', models.BooleanField(default=False)),
                ('can_retake', models.BooleanField(default=False)),
                ('classroom', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='educational_establishment.Class', verbose_name='class')),
                ('quiz', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='quiz_framework.QuizFrameworks')),
            ],
            options={
                'verbose_name': 'class quiz',
                'verbose_name_plural': 'class quizzes',
            },
        ),
    ]
