# Generated by Django 2.2.18 on 2021-02-02 14:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0017_auto_20210202_1415'),
        ('quiz_framework', '0003_quizframeworks_order'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='quizframeworks',
            options={'ordering': ['order', 'title'], 'verbose_name': 'quiz', 'verbose_name_plural': 'quiz frameworks'},
        ),
        migrations.AlterUniqueTogether(
            name='quizquestions',
            unique_together={('quiz', 'question')},
        ),
    ]
