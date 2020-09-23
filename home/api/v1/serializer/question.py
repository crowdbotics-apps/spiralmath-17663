import json

from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.exceptions import ValidationError, PermissionDenied
from rest_framework.validators import UniqueValidator
from typing import List
from home.models import Question, Settings, STANDARD_CODE_PATH
from rest_framework.response import Response


def validate_grade_level(data_grade_level):
    standard_code = Settings.objects.filter(path=STANDARD_CODE_PATH).first()
    if int(data_grade_level) not in standard_code.value_json['Grade']:
        return False
    return True


class QuestionBase(serializers.ModelSerializer):
    """List any question Serializer."""

    imagePath = serializers.SerializerMethodField(read_only=True)

    def get_imagePath(self, obj):
        """Get image path."""
        if obj.image:
            return str(obj.image).split("home")[1]
        return ''

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
            'alt_text',
            'mills_difficulty_level',
            'dok',
            'copyright_status',
            'question_style',
            'summative_status',
            'approved_status',
            'state_model',
            'author_memo',
            'creator',
            'standard_code',
            'standard_set',
            'imagePath',
            'created',
            'reviewer_date',
            'modified',
        ]
        read_only_fields: List[str] = ['created', 'modified']


class QuestionList(QuestionBase):
    """List any questions Serializer."""

    class Meta(QuestionBase.Meta):
        fields = ['id', 'value', 'approved_status']


class QuestionCreate(QuestionBase):
    """Create a Question Serializer."""

    class Meta(QuestionBase.Meta):
        fields = QuestionBase.Meta.fields + ['image']

    def validate(self, data):
        """Validate create question."""
        if not data['reviewer_name'].user_type.review_questions:
            raise ValidationError(detail={'reviewer_name': ['This user cannot review questions.']})
        if not validate_grade_level(data['grade_level']):
            raise ValidationError(detail={'grade_level': ['This Grade Level is not available.']})
        return data

    def create(self, validated_data):
        """Create question."""
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
        if not request_user_type.create_questions:
            if len(updating_attributes) > 1 or\
                    (len(updating_attributes) == 1 and updating_attributes[0] is not 'approved_status'):
                raise PermissionDenied
        if not request_user_type.review_questions and 'approved_status' in updating_attributes:
            raise PermissionDenied

        if 'reviewer_name' in updating_attributes and not data['reviewer_name'].user_type.review_questions:
            raise ValidationError(detail={'reviewer_name': ['This user cannot review questions.']})
        if 'grade_level' in updating_attributes and not validate_grade_level(data['grade_level']):
            raise ValidationError(detail={'grade_level': ['This Grade Level is not available.']})
        return data

