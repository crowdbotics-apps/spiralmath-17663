# Generated by Django 2.2.17 on 2021-02-02 12:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('home', '0016_auto_20201217_0740'),
    ]

    operations = [
        migrations.CreateModel(
            name='QuizFrameworks',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('grade', models.CharField(max_length=200)),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('footer', models.CharField(max_length=200)),
                ('sequence', models.DecimalField(decimal_places=1, max_digits=1000)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('created_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'quiz',
                'verbose_name_plural': 'quiz frameworks',
            },
        ),
        migrations.CreateModel(
            name='QuizQuestions',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home.Question')),
                ('quiz', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='quiz_framework.QuizFrameworks')),
            ],
            options={
                'verbose_name': 'quiz question',
                'verbose_name_plural': 'quiz questions',
            },
        ),
    ]
