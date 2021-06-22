from django.contrib import admin

from . import models
from . import forms


class UserAdmin(admin.ModelAdmin):

    def get_fieldsets(self, request, obj=None):
        if not obj:
            return self.add_fieldsets
        return super().get_fieldsets(request, obj)

    def get_form(self, request, obj=None, **kwargs):
        """
        Use special form during user creation
        """
        defaults = {}
        if obj is None:
            defaults['form'] = self.add_form
        defaults.update(kwargs)
        return super().get_form(request, obj, **defaults)

    def lookup_allowed(self, lookup, value):
        # Don't allow lookups involving passwords.
        return not lookup.startswith('password') and super().lookup_allowed(lookup, value)


@admin.register(models.School)
class SchoolAdmin(admin.ModelAdmin):
    search_fields = ['name']
    list_filter = ['school_type']
    readonly_fields = ['created', 'modified']
    fieldsets = (
        (None, {'fields': ('district', 'school_type', 'name', 'grades', 'address', 'nation', 'state_province',
                           'phone', 'website')}),
        ('Additional', {'fields': ('memo', 'is_active')}),
        ('Timestamp', {'fields': ('created', 'modified')})
    )


@admin.register(models.SchoolDistrict)
class SchoolDistrictAdmin(admin.ModelAdmin):
    search_fields = ['name']
    list_filter = ['district_type', 'is_active']
    readonly_fields = ['created', 'modified']
    fieldsets = (
        (None, {'fields': ('district_type', 'name', 'address', 'state_province', 'nation', 'phone', 'website')}),
        ('Additional', {'fields': ('memo', 'is_active')}),
        ('Timestamp', {'fields': ('created', 'modified')})
    )


@admin.register(models.SchoolPrincipal)
class SchoolPrincipalAdmin(UserAdmin):
    search_fields = ['first_name', 'middle_name', 'last_name']
    list_filter = ['is_active']
    readonly_fields = ['created', 'modified']
    add_form = forms.AddSchoolBossForm
    add_fieldsets = (
        (None, {'fields': ('first_name', 'middle_name', 'last_name', 'work_email', 'personal_email',
                           'work_phone', 'personal_phone')}),
        ('School', {'fields': ('school',)}),
        ('Password', {'fields': ('password1', 'password2')}),
        ('Additional', {'fields': ('memo', 'is_active')}),
        ('Timestamp', {'fields': ('created', 'modified')})
    )
    fieldsets = (
        (None, {'fields': ('first_name', 'middle_name', 'last_name', 'work_email', 'personal_email',
                           'work_phone', 'personal_phone')}),
        ('School', {'fields': ('school',)}),
        ('Additional', {'fields': ('memo', 'is_active')}),
        ('Timestamp', {'fields': ('created', 'modified')})
    )


@admin.register(models.DistrictPrincipal)
class DistrictPrincipalAdmin(UserAdmin):
    search_fields = ['first_name', 'middle_name', 'last_name']
    list_filter = ['is_active']
    readonly_fields = ['created', 'modified']
    add_form = forms.AddDistrictBossForm
    add_fieldsets = (
        (None, {'fields': ('district', 'first_name', 'middle_name', 'last_name', 'work_email',
                           'personal_email', 'work_phone', 'personal_phone')}),
        ('Password', {'fields': ('password1', 'password2')}),
        ('Additional', {'fields': ('memo', 'is_active')}),
        ('Timestamp', {'fields': ('created', 'modified')})
    )
    fieldsets = (
        (None, {'fields': ('first_name', 'middle_name', 'last_name', 'work_email', 'personal_email',
                           'work_phone', 'personal_phone')}),
        ('Additional', {'fields': ('memo', 'is_active')}),
        ('Timestamp', {'fields': ('created', 'modified')})
    )


@admin.register(models.LeadTeacher)
class LeadTeacherAdmin(UserAdmin):
    search_fields = ['first_name', 'middle_name', 'last_name']
    list_filter = ['is_active']
    readonly_fields = ['created', 'modified']
    add_form = forms.AddLeadTeacherForm
    add_fieldsets = (
        (None, {'fields': ('first_name', 'middle_name', 'last_name', 'work_email', 'personal_email',
                           'work_phone', 'personal_phone')}),
        ('Password', {'fields': ('password1', 'password2')}),
        ('Additional', {'fields': ('memo', 'is_active')}),
        ('Timestamp', {'fields': ('created', 'modified')})
    )
    fieldsets = (
        (None, {'fields': ('first_name', 'middle_name', 'last_name', 'work_email', 'personal_email',
                           'work_phone', 'personal_phone')}),
        ('Additional', {'fields': ('memo', 'is_active')}),
        ('Timestamp', {'fields': ('created', 'modified')})
    )


@admin.register(models.AssistTeacher)
class AssistTeacherAdmin(UserAdmin):
    list_display = ['get_full_name', 'is_active']
    search_fields = ['first_name', 'middle_name', 'last_name']
    list_filter = ['is_active']
    readonly_fields = ['get_full_name', 'created', 'modified']
    add_form = forms.AddAssistTeacherForm
    add_fieldsets = (
        (None, {'fields': ('first_name', 'middle_name', 'last_name', 'work_email', 'personal_email',
                           'work_phone', 'personal_phone')}),
        ('Password', {'fields': ('password1', 'password2')}),
        ('Additional', {'fields': ('memo', 'is_active')}),
        ('Timestamp', {'fields': ('created', 'modified')})
    )
    fieldsets = (
        (None, {'fields': ('first_name', 'middle_name', 'last_name', 'work_email', 'personal_email',
                           'work_phone', 'personal_phone')}),
        ('Additional', {'fields': ('memo', 'is_active')}),
        ('Timestamp', {'fields': ('created', 'modified')})
    )


@admin.register(models.Student)
class StudentAdmin(UserAdmin):
    search_fields = ['first_name', 'middle_name', 'last_name', 'email']
    list_filter = ['is_active']
    readonly_fields = ['created', 'modified']
    add_form = forms.AddStudentForm
    add_fieldsets = (
        (None, {'fields': ('first_name', 'middle_name', 'last_name', 'district', 'nickname', 'email', 'phone')}),
        ('Parents', {'fields': ('parent1_name', 'parent1_phone', 'parent1_email', 'parent2_name', 'parent2_phone',
                                'parent2_email')}),
        ('Password', {'fields': ('password1', 'password2')}),
        ('Additional', {'fields': ('memo', 'is_active')}),
        ('Timestamp', {'fields': ('created', 'modified')})
    )
    fieldsets = (
        (None, {'fields': ('first_name', 'middle_name', 'last_name', 'district', 'nickname', 'email', 'phone')}),
        ('Parents', {'fields': ('parent1_name', 'parent1_phone', 'parent1_email', 'parent2_name', 'parent2_phone',
                                'parent2_email')}),
        ('Additional', {'fields': ('memo', 'is_active')}),
        ('Timestamp', {'fields': ('created', 'modified')})
    )


@admin.register(models.Class)
class ClassAdmin(admin.ModelAdmin):
    search_fields = ['name']
    list_filter = ['is_active']
    readonly_fields = ['created', 'modified']
    fieldsets = (
        (None, {'fields': ('school', 'lead_teacher', 'assist_teacher', 'name', 'grade', 'subject', 'period', 'location',
                           'year', 'classroom_mode', 'quiz_repeat_mode', 'homework_mode', 'parents_notify_mode')}),
        ('Additional', {'fields': ('memo', 'is_active')}),
        ('Timestamp', {'fields': ('created', 'modified')})
    )


@admin.register(models.ClassRoll)
class ClassRollAdmin(admin.ModelAdmin):
    list_filter = ['is_active']
    readonly_fields = ['created', 'modified']
    fieldsets = (
        (None, {'fields': ('class_ref', 'student')}),
        ('Additional', {'fields': ('memo', 'is_active')}),
        ('Timestamp', {'fields': ('created', 'modified')})
    )


@admin.register(models.ClassQuiz)
class ClassQuizAdmin(admin.ModelAdmin):
    list_filter = ['is_active']
    readonly_fields = ['created', 'modified']
    fieldsets = (
        (None, {'fields': ('classroom', 'quiz', 'date_given', 'students_completed', 'quiz_now', 'can_retake')}),
        ('Additional', {'fields': ('memo', 'is_active')}),
        ('Timestamp', {'fields': ('created', 'modified')})
    )
