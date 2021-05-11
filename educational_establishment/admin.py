from django.contrib import admin

from .models import School, SchoolDistrict, DistrictPrincipal, SchoolPrincipal, Teacher, Student, Class, ClassRoll


@admin.register(School)
class SchoolAdmin(admin.ModelAdmin):
    search_fields = ['name']
    list_filter = ['school_type']
    readonly_fields = ['created', 'modified']
    fieldsets = (
        (None, {'fields': ('district', 'school_type', 'name', 'grades', 'address', 'nation', 'state_province',
                           'phone')}),
        ('Additional', {'fields': ('memo', 'is_active')}),
        ('Timestamp', {'fields': ('created', 'modified')})
    )


@admin.register(SchoolDistrict)
class SchoolDistrictAdmin(admin.ModelAdmin):
    search_fields = ['name']
    list_filter = ['district_type', 'is_active']
    readonly_fields = ['created', 'modified']
    fieldsets = (
        (None, {'fields': ('district_type', 'name', 'address', 'state_province', 'nation', 'phone')}),
        ('Additional', {'fields': ('memo', 'is_active')}),
        ('Timestamp', {'fields': ('created', 'modified')})
    )


@admin.register(SchoolPrincipal)
class SchoolPrincipalAdmin(admin.ModelAdmin):
    search_fields = ['first_name', 'middle_name', 'last_name']
    list_filter = ['is_active']
    readonly_fields = ['created', 'modified']
    fieldsets = (
        (None, {'fields': ('first_name', 'middle_name', 'last_name', 'work_email', 'personal_email',
                           'work_phone', 'personal_phone')}),
        ('Additional', {'fields': ('memo', 'is_active')}),
        ('Timestamp', {'fields': ('created', 'modified')})
    )


@admin.register(DistrictPrincipal)
class DistrictPrincipalAdmin(admin.ModelAdmin):
    search_fields = ['first_name', 'middle_name', 'last_name']
    list_filter = ['is_active']
    readonly_fields = ['created', 'modified']
    fieldsets = (
        (None, {'fields': ('first_name', 'middle_name', 'last_name', 'work_email', 'personal_email',
                           'work_phone', 'personal_phone')}),
        ('Additional', {'fields': ('memo', 'is_active')}),
        ('Timestamp', {'fields': ('created', 'modified')})
    )


@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    search_fields = ['first_name', 'middle_name', 'last_name']
    list_filter = ['is_active']
    readonly_fields = ['created', 'modified']
    fieldsets = (
        (None, {'fields': ('first_name', 'middle_name', 'last_name', 'work_email', 'personal_email',
                           'work_phone', 'personal_phone')}),
        ('Additional', {'fields': ('memo', 'is_active')}),
        ('Timestamp', {'fields': ('created', 'modified')})
    )


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    search_fields = ['first_name', 'middle_name', 'last_name', 'email']
    list_filter = ['is_active']
    readonly_fields = ['created', 'modified']
    fieldsets = (
        (None, {'fields': ('first_name', 'middle_name', 'last_name', 'district', 'nickname', 'email', 'phone',
                           'parent1_name', 'parent1_phone', 'parent1_email', 'parent2_name', 'parent2_phone',
                           'parent2_email')}),
        ('Additional', {'fields': ('memo', 'is_active')}),
        ('Timestamp', {'fields': ('created', 'modified')})
    )


@admin.register(Class)
class ClassAdmin(admin.ModelAdmin):
    search_fields = ['name']
    list_filter = ['is_active']
    readonly_fields = ['created', 'modified']
    fieldsets = (
        (None, {'fields': ('school', 'lead_teacher', 'teacher', 'name', 'grade', 'subject', 'period', 'location',
                           'year', 'classroom_mode', 'quiz_repeat_mode', 'homework_mode', 'parents_notify_mode')}),
        ('Additional', {'fields': ('memo', 'is_active')}),
        ('Timestamp', {'fields': ('created', 'modified')})
    )


@admin.register(ClassRoll)
class ClassRollAdmin(admin.ModelAdmin):
    list_filter = ['is_active']
    readonly_fields = ['created', 'modified']
    fieldsets = (
        (None, {'fields': ('class_ref', 'student')}),
        ('Additional', {'fields': ('memo', 'is_active')}),
        ('Timestamp', {'fields': ('created', 'modified')})
    )
