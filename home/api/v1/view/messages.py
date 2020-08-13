import datetime

from django.contrib.auth import get_user_model

from rest_framework import mixins, viewsets
from rest_framework.exceptions import NotFound
from rest_framework.decorators import action
from rest_framework.response import Response

from home.api.v1.serializer.messages import MessagesSerializer, MessagesFull, MessagesCreate
from home.models import Messages

User = get_user_model()


class MessagesViewSet(
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    """Sent and Receive messages."""

    queryset = Messages.objects.all()
    serializer_class = MessagesSerializer

    def get_queryset(self: 'MessagesViewSet'):
        """Allowed to see chats with you only."""
        queryset = super().get_queryset()
        queryset = queryset.filter(users__contains=self.request.user.pk)
        return queryset

    @action(
        detail=False,
        methods=['post'],
        url_path='send',
        serializer_class=MessagesCreate
    )
    def send(self, request):
        """Send a new message."""
        user_to = request.data['userTo']
        new_message = request.data['newMessage']

        user_from = self.request.user
        user_to = User.objects.filter(id=user_to).first()
        if not user_to:
            raise NotFound(detail='Recipient is not found.')
        chatting_users = [user_from.id, user_to.id]
        chat = Messages.objects.filter(users__contains=chatting_users).first()
        content = {
            'to_id': user_to.id,
            'text': {user_from.full_name(): new_message},
            'date': datetime.datetime.now().strftime("%m/%d/%Y, %H:%M:%S")
        }
        if chat:
            chat.content.append(content)
            content = chat.content
        if not chat:
            chat = Messages()
            chat.users = chatting_users
            content = [content]
        chat.content = content
        chat.status = False
        chat.save()
        return Response({"details": MessagesFull(chat).data})

    @action(
        detail=True,
        methods=['get'],
        url_path='load',
        serializer_class=MessagesFull
    )
    def load(self, request, pk):
        """Load chat."""
        user_id = self.request.user.id
        chat = Messages.objects.filter(id=pk, users__contains=self.request.user.id).first()
        if not chat:
            raise NotFound(detail='Chat is not found.')
        last_message = chat.content[-1]
        if last_message['to_id'] is user_id:
            chat.status = True
            chat.save()
        return Response({"details": MessagesFull(chat).data})
