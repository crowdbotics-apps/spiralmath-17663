# Generated by Django 2.2.22 on 2021-05-11 17:33

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import django_countries.fields
import model_utils.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DistrictPrincipal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('memo', models.TextField(blank=True, default='')),
                ('is_active', models.BooleanField(default=True)),
                ('first_name', models.CharField(max_length=200)),
                ('middle_name', models.CharField(blank=True, default='', max_length=200)),
                ('last_name', models.CharField(max_length=200)),
                ('work_email', models.EmailField(max_length=254)),
                ('personal_email', models.EmailField(max_length=254)),
                ('work_phone', models.CharField(max_length=200)),
                ('personal_phone', models.CharField(max_length=200)),
            ],
            options={
                'verbose_name': 'district principal',
                'verbose_name_plural': 'district principals',
            },
        ),
        migrations.CreateModel(
            name='SchoolDistrict',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('memo', models.TextField(blank=True, default='')),
                ('is_active', models.BooleanField(default=True)),
                ('district_type', models.CharField(choices=[('PUBLIC', 'Public'), ('PUBLIC_CHARTER', 'Public charter'), ('RELIGIOUS', 'Religious'), ('INDEPENDENT', 'Independent')], default='PUBLIC', max_length=100)),
                ('name', models.CharField(max_length=200)),
                ('address', models.TextField()),
                ('state_province', models.CharField(max_length=200)),
                ('nation', django_countries.fields.CountryField(max_length=2)),
                ('phone', models.CharField(max_length=200)),
            ],
            options={
                'verbose_name': 'school district',
                'verbose_name_plural': 'school districts',
            },
        ),
        migrations.CreateModel(
            name='SchoolPrincipal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('memo', models.TextField(blank=True, default='')),
                ('is_active', models.BooleanField(default=True)),
                ('first_name', models.CharField(max_length=200)),
                ('middle_name', models.CharField(blank=True, default='', max_length=200)),
                ('last_name', models.CharField(max_length=200)),
                ('work_email', models.EmailField(max_length=254)),
                ('personal_email', models.EmailField(max_length=254)),
                ('work_phone', models.CharField(max_length=200)),
                ('personal_phone', models.CharField(max_length=200)),
            ],
            options={
                'verbose_name': 'school principal',
                'verbose_name_plural': 'school principals',
            },
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('memo', models.TextField(blank=True, default='')),
                ('is_active', models.BooleanField(default=True)),
                ('first_name', models.CharField(max_length=200)),
                ('middle_name', models.CharField(blank=True, default='', max_length=200)),
                ('last_name', models.CharField(max_length=200)),
                ('district_id', models.CharField(max_length=200)),
                ('nickname', models.CharField(blank=True, default='', max_length=200)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(max_length=200)),
                ('parent1_name', models.CharField(max_length=200)),
                ('parent1_phone', models.CharField(max_length=200)),
                ('parent1_email', models.EmailField(max_length=254)),
                ('parent2_name', models.CharField(max_length=200)),
                ('parent2_phone', models.CharField(max_length=200)),
                ('parent2_email', models.EmailField(max_length=254)),
            ],
            options={
                'verbose_name': 'student',
                'verbose_name_plural': 'students',
            },
        ),
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('memo', models.TextField(blank=True, default='')),
                ('is_active', models.BooleanField(default=True)),
                ('first_name', models.CharField(max_length=200)),
                ('middle_name', models.CharField(blank=True, default='', max_length=200)),
                ('last_name', models.CharField(max_length=200)),
                ('work_email', models.EmailField(max_length=200)),
                ('personal_email', models.EmailField(max_length=200)),
                ('work_phone', models.CharField(max_length=200)),
                ('personal_phone', models.CharField(max_length=200)),
            ],
            options={
                'verbose_name': 'teacher',
                'verbose_name_plural': 'teachers',
            },
        ),
        migrations.CreateModel(
            name='School',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('school_type', models.CharField(choices=[('PUBLIC', 'Public'), ('PUBLIC_CHARTER', 'Public charter'), ('RELIGIOUS', 'Religious'), ('INDEPENDENT', 'Independent')], default='PUBLIC', max_length=100)),
                ('name', models.CharField(max_length=200)),
                ('grades', models.CharField(max_length=200)),
                ('address', models.TextField()),
                ('state_province', django_countries.fields.CountryField(max_length=2)),
                ('phone', models.CharField(max_length=200)),
                ('district', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='educational_establishment.SchoolDistrict')),
            ],
            options={
                'verbose_name': 'school',
                'verbose_name_plural': 'schools',
            },
        ),
    ]