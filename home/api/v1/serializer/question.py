from rest_framework import serializers
from rest_framework.exceptions import ValidationError, PermissionDenied
from typing import List
from home.models import Question, Settings, STANDARD_CODE_PATH
from django.conf import settings

from .answer import AnswerSerializer


def validate_grade_level(data_grade_level):
    standard_code = Settings.objects.filter(path=STANDARD_CODE_PATH).first()
    grades = standard_code.value_json['Grade']
    grades = [str(x) for x in grades]
    if data_grade_level not in grades:
        return False
    return True


class QuestionBase(serializers.ModelSerializer):
    """List any question Serializer."""
    answers = AnswerSerializer(source='answer_set', many=True, read_only=True)

    class Meta(object):
        model = Question
        fields: List[str] = [
            'id',
            'value',
            'author_name',
            'reviewer_name',
            'grade_level',
            'question_type',
            'content_source',
            'image_source',
            'image',
            'alt_text',
            'mills_difficulty_level',
            'dok',
            'copyright_status',
            'question_style',
            'summative_status',
            'approved_status',
            'reviewer_feedback',
            'state_model',
            'author_memo',
            'creator',
            'standard_code',
            'standard_set',
            'created',
            'reviewer_date',
            'deleted_status',
            'deleted',
            'modified',
            'answers'
        ]
        read_only_fields: List[str] = ['created', 'modified']


class QuestionList(QuestionBase):
    """List any questions Serializer."""
    answers = AnswerSerializer(source='answer_set', many=True, read_only=True)

    class Meta(QuestionBase.Meta):
        fields = ['id', 'user', 'value', 'image', 'image_source', 'approved_status', 'creator', 'grade_level',
                  'deleted_status', 'deleted', 'mills_difficulty_level', 'grade_level', 'standard_code',
                  'question_style', 'dok', 'content_source', 'answers']


class QuestionCreate(QuestionBase):
    """Create a Question Serializer."""

    class Meta(QuestionBase.Meta):
        fields = QuestionBase.Meta.fields + ['image']

    def validate(self, data):
        """Validate create question."""
        if not data['reviewer_name']:
            raise ValidationError(detail={'reviewer_name': ['This field may not be blank.']})
        if not data['reviewer_name'].user_type.review_questions:
            raise ValidationError(detail={'reviewer_name': ['This user cannot review questions.']})
        if not validate_grade_level(data['grade_level']):
            raise ValidationError(detail={'grade_level': ['This Grade Level is not available.']})
        return data

    def create(self, validated_data):
        """Create question."""
        request = self.context.get('request', None)
        validated_data.update({'user': request.user})
        new_question = super().create(validated_data)
        return new_question


class QuestionUpdate(QuestionBase):
    """Update a question."""

    class Meta(QuestionBase.Meta):
        fields = QuestionBase.Meta.fields + ['image']

    def validate(self, data):
        """
            CA - create question, RQ - review question
            CA | RQ | 
            0  |  0 | Permission denied
            1  |  0 | Can update all fields except a_status
            0  |  1 | Can update only a_status
            1  |  1 | Can update all fields
        """
        request = self.context.get('request', None)
        request_user_type = request.user.user_type
        updating_attributes = list(dict.keys(data))
        creator_accessible_fields = {
            'value',
            'author_name',
            'reviewer_name',
            'grade_level',
            'question_type',
            'content_source',
            'image_source',
            'image',
            'alt_text',
            'mills_difficulty_level',
            'dok',
            'copyright_status',
            'question_style',
            'summative_status',
            'state_model',
            'author_memo',
            'creator',
            'standard_code',
            'standard_set',
            'created',
            'deleted',
        }
        if not request_user_type.create_questions:
            if len(updating_attributes) > 3:
                raise PermissionDenied
            else:
                for updating_attribute in updating_attributes:
                    if updating_attribute in creator_accessible_fields:
                        raise PermissionDenied

        if not request_user_type.review_questions and \
                ('approved_status' in updating_attributes
                 or 'reviewer_feedback' in updating_attributes or 'deleted_status' in updating_attributes):
            raise PermissionDenied

        if request_user_type.create_questions and self.instance.approved_status is Question.ASTATUS.APPROVED:
            raise PermissionDenied(detail='This question has been approved already.')

        if request_user_type.create_questions and self.instance.deleted is True \
                and self.instance.deleted_status is True:
            raise PermissionDenied(detail='This question has been deleted and cannot be modified.')

        if 'reviewer_name' in updating_attributes and not data['reviewer_name'].user_type.review_questions:
            raise ValidationError(detail={'reviewer_name': ['This user cannot review questions.']})
        if 'grade_level' in updating_attributes and not validate_grade_level(data['grade_level']):
            raise ValidationError(detail={'grade_level': ['This Grade Level is not available.']})
        lang_codes = [c for (c, name) in settings.LANGUAGES]
        if 'language' in updating_attributes and data['language'] not in lang_codes:
            raise ValidationError(detail={'language': ['This language is not available.']})
        return data

