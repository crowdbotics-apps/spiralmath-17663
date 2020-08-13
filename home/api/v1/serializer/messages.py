from rest_framework import serializers
from home.models import Messages


class MessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messages
        fields = ['id', 'users', 'status', 'modified']


class MessagesFull(serializers.ModelSerializer):
    class Meta:
        model = Messages
        fields = ['id', 'users', 'content', 'status']


class MessagesCreate(serializers.ModelSerializer):
    newMessage = serializers.CharField(write_only=True, required=True)
    userTo = serializers.IntegerField(write_only=True, required=True)  # user.id

    class Meta:
        model = Messages
        fields = ['userTo', 'newMessage']
