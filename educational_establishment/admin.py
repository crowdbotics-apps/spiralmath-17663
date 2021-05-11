from django.contrib import admin

from .models import School, SchoolDistrict, SchoolPrincipal, Teacher, Student, Class, ClassRoll


@admin.register(School)
class SchoolAdmin(admin.ModelAdmin):
    search_fields = ['name']
    list_filter = ['school_type']


@admin.register(SchoolDistrict)
class SchoolDistrictAdmin(admin.ModelAdmin):
    search_fields = ['name']
    list_filter = ['district_type', 'is_active']


@admin.register(SchoolPrincipal)
class SchoolPrincipalAdmin(admin.ModelAdmin):
    search_fields = ['first_name', 'middle_name', 'last_name']
    list_filter = ['is_active']


@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    search_fields = ['first_name', 'middle_name', 'last_name']
    list_filter = ['is_active']


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    search_fields = ['first_name', 'middle_name', 'last_name', 'email']
    list_filter = ['is_active']


@admin.register(Class)
class ClassAdmin(admin.ModelAdmin):
    search_fields = ['name']
    list_filter = ['is_active']


@admin.register(ClassRoll)
class ClassRollAdmin(admin.ModelAdmin):
    list_filter = ['is_active']
