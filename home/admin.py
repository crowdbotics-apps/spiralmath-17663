from django.contrib import admin

from home.models import Settings, Question, Creator, Answer
# Register your models here.


class AnswerInline(admin.StackedInline):
    model = Answer


@admin.register(Settings)
class Settings(admin.ModelAdmin):
    """Simple admin for Settings."""

    list_display = ('id', 'path', 'value', 'is_deletable', 'created', 'modified')
    list_filter = ('id',)


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    inlines = [AnswerInline]


admin.site.register(Creator, admin.ModelAdmin)
