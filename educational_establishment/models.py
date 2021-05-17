from django.db import models

from django_countries.fields import CountryField
from model_utils.models import TimeStampedModel
from localflavor.us.models import USStateField


class MetaInfoMixin(models.Model):
    memo = models.TextField(blank=True, default='')
    is_active = models.BooleanField(default=True)

    class Meta:
        abstract = True


class PersonFieldsMixin(models.Model):
    first_name = models.CharField(max_length=200)
    middle_name = models.CharField(max_length=200, blank=True, default='')
    last_name = models.CharField(max_length=200)

    def __str__(self):
        return self.get_full_name

    @property
    def get_full_name(self):
        return ' '.join([self.first_name, self.middle_name, self.last_name])

    class Meta:
        abstract = True


class SchoolDistrict(MetaInfoMixin, TimeStampedModel):
    class DistrictTypes:
        PUBLIC, PUBLIC_CHARTER, RELIGIOUS, INDEPENDENT = ['PUBLIC', 'PUBLIC_CHARTER', 'RELIGIOUS', 'INDEPENDENT']
        choices = (
            (PUBLIC, 'Public'),
            (PUBLIC_CHARTER, 'Public charter'),
            (RELIGIOUS, 'Religious'),
            (INDEPENDENT, 'Independent')
        )

    district_type = models.CharField(choices=DistrictTypes.choices, max_length=100, default=DistrictTypes.PUBLIC)
    name = models.CharField(max_length=200)
    address = models.TextField()
    state_province = USStateField(blank=True, default='')
    nation = CountryField(default='US')
    phone = models.CharField(max_length=200)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'school district'
        verbose_name_plural = 'school districts'


class SchoolPrincipal(PersonFieldsMixin, MetaInfoMixin, TimeStampedModel):
    work_email = models.EmailField()
    personal_email = models.EmailField()
    work_phone = models.CharField(max_length=200)
    personal_phone = models.CharField(max_length=200)

    class Meta:
        verbose_name = 'school boss'
        verbose_name_plural = 'school boss'


class DistrictPrincipal(PersonFieldsMixin, MetaInfoMixin, TimeStampedModel):
    work_email = models.EmailField()
    personal_email = models.EmailField()
    work_phone = models.CharField(max_length=200)
    personal_phone = models.CharField(max_length=200)

    class Meta:
        verbose_name = 'district boss'
        verbose_name_plural = 'district boss'


class School(MetaInfoMixin, TimeStampedModel):
    class SchoolTypes:
        PUBLIC, PUBLIC_CHARTER, RELIGIOUS, INDEPENDENT = ['PUBLIC', 'PUBLIC_CHARTER', 'RELIGIOUS', 'INDEPENDENT']
        choices = (
            (PUBLIC, 'Public'),
            (PUBLIC_CHARTER, 'Public charter'),
            (RELIGIOUS, 'Religious'),
            (INDEPENDENT, 'Independent')
        )
    district = models.ForeignKey(SchoolDistrict, on_delete=models.SET_NULL, null=True)
    school_type = models.CharField(choices=SchoolTypes.choices, max_length=100, default=SchoolTypes.PUBLIC)
    name = models.CharField(max_length=200)
    grades = models.CharField(max_length=200)
    address = models.TextField()
    nation = CountryField(default='US')
    state_province = USStateField(blank=True, default='')
    phone = models.CharField(max_length=200)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'school'
        verbose_name_plural = 'schools'


class Teacher(PersonFieldsMixin, MetaInfoMixin, TimeStampedModel):
    work_email = models.EmailField(max_length=200)
    personal_email = models.EmailField(max_length=200)
    work_phone = models.CharField(max_length=200)
    personal_phone = models.CharField(max_length=200)

    class Meta:
        verbose_name = 'teacher'
        verbose_name_plural = 'teachers'


class Student(PersonFieldsMixin, MetaInfoMixin, TimeStampedModel):
    district = models.ForeignKey(SchoolDistrict, on_delete=models.SET_NULL, null=True)
    nickname = models.CharField(max_length=200, blank=True, default='')
    email = models.EmailField()
    phone = models.CharField(max_length=200)
    parent1_name = models.CharField(max_length=200)
    parent1_phone = models.CharField(max_length=200)
    parent1_email = models.EmailField()
    parent2_name = models.CharField(max_length=200)
    parent2_phone = models.CharField(max_length=200)
    parent2_email = models.EmailField()

    class Meta:
        verbose_name = 'student'
        verbose_name_plural = 'students'


class Class(MetaInfoMixin, TimeStampedModel):
    school = models.ForeignKey(
        School,
        on_delete=models.SET_NULL,
        null=True
    )
    lead_teacher = models.ForeignKey(
        Teacher,
        on_delete=models.SET_NULL,
        null=True,
        related_name='leading_classes'
    )
    teacher = models.ForeignKey(
        Teacher,
        on_delete=models.SET_NULL,
        null=True
    )
    name = models.CharField(max_length=200)
    grade = models.CharField(max_length=200)
    subject = models.TextField()
    period = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    year = models.CharField(max_length=200)
    classroom_mode = models.BooleanField(default=True)
    quiz_repeat_mode = models.BooleanField(default=False)
    homework_mode = models.BooleanField(default=False)
    parents_notify_mode = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'class'
        verbose_name_plural = 'classes'


class ClassRoll(MetaInfoMixin, TimeStampedModel):
    class_ref = models.ForeignKey(Class, verbose_name='class', on_delete=models.SET_NULL, null=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.class_ref.__str__()} - {self.student.__str__()}'

    class Meta:
        verbose_name = 'class roll'
