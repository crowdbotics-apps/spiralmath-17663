from django.contrib import admin

from adminsortable2.admin import SortableInlineAdminMixin, SortableAdminMixin

from .models import QuizFrameworks, QuizQuestions


class QuizQuestionsInline(SortableInlineAdminMixin, admin.StackedInline):
    model = QuizQuestions
    extra = 0


@admin.register(QuizFrameworks)
class QuizFrameworksAdmin(SortableAdminMixin, admin.ModelAdmin):
    search_fields = ['title', 'description', 'footer']
    list_filter = ['grade', 'created']
    inlines = [QuizQuestionsInline]


