from rest_framework import serializers

from quiz_framework.models import QuizFrameworks, QuizQuestions


class QuizQuestionsSerializer(serializers.ModelSerializer):

    class Meta:
        model = QuizQuestions
        fields = ['id', 'quiz', 'order', 'question']


class QuizFrameworksSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())
    questions = QuizQuestionsSerializer(read_only=True, many=True)

    class Meta:
        model = QuizFrameworks
        fields = ['id', 'author', 'grade', 'order', 'title', 'description',
                  'footer', 'sequence', 'questions']
