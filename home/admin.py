from django.contrib import admin

from home.models import Settings, Question, Creator
# Register your models here.


@admin.register(Settings)
class Settings(admin.ModelAdmin):
    """Simple admin for Settings."""

    list_display = ('id', 'path', 'value', 'is_deletable', 'created', 'modified')
    list_filter = ('id',)


admin.site.register(Question, admin.ModelAdmin)
admin.site.register(Creator, admin.ModelAdmin)
