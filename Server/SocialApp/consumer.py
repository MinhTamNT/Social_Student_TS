from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from .models import Conversation, Message, User,Friend,Notification
from oauth2_provider.models import AccessToken
import json
from django.db.models.signals import post_save
from django.dispatch import receiver

class PersonalChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        token = self.scope['query_string'].decode().split('=')[1]

        self.user = await self.get_user(token)
        if isinstance(self.user, AnonymousUser):
            await self.close()
        else:
            self.conversation = await self.get_or_create_conversation(self.room_name)
            await database_sync_to_async(self.conversation.members.add)(self.user)
            await database_sync_to_async(self.conversation.save)()

            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )

            await self.accept()

            messages = await self.load_messages(self.conversation)
            await self.send(text_data=json.dumps({
                'type': 'load_messages',
                'messages': messages
            }))

    async def disconnect(self, close_code):
        if hasattr(self, 'user') and hasattr(self, 'conversation'):
            await database_sync_to_async(self.conversation.members.remove)(self.user)

            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data.get('message')
        receiver_id = data.get('receiver')
        timestamp = data.get('timestamp')
        print(receiver_id)
        print(message)
        if message:
            message_obj = await self.create_message(message, receiver_id, timestamp)
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message,
                    'sender': self.user.username,
                }
            )
        else:
            await self.send(text_data=json.dumps({
                'error': 'Invalid data format'
            }))

    async def chat_message(self, event):
        message = event['message']
        sender = event['sender']

        await self.send(text_data=json.dumps({
            'message': message,
            'sender': sender
        }))

    @database_sync_to_async
    def get_user(self, token):
        try:
            access_token = AccessToken.objects.get(token=token)

            if access_token.is_valid():
                return access_token.user
            else:
                return AnonymousUser()
        except AccessToken.DoesNotExist:
            return AnonymousUser()

    @database_sync_to_async
    def get_or_create_conversation(self, room_name):
        conversation, _ = Conversation.objects.get_or_create(name=room_name)
        return conversation

    @database_sync_to_async
    def create_message(self, message, receiver_id, timestamp):
        print(message)
        receiver = User.objects.get(id=receiver_id)
        return Message.objects.create(
            description=message,
            sender_name=self.user,
            receiver_name=receiver,
            timestamp=timestamp,
            room=self.conversation
        )

    @database_sync_to_async
    def load_messages(self, conversation):
        messages = Message.objects.filter(room=conversation).order_by('timestamp')
        return [{
            'message': msg.description,
            'sender_name': msg.sender_name.username,
            'receiver_name': msg.receiver_name.username,
            'timestamp': msg.timestamp.strftime('%Y-%m-%d %H:%M:%S')
        } for msg in messages]




class FriendConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        token = self.scope['query_string'].decode().split('=')[1]
        self.user = await self.get_user(token)
        if self.user.is_anonymous:
            await self.close()
        else:
            await self.channel_layer.group_add(
                f"user_{self.user.id}",
                self.channel_name
            )
            await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            f"user_{self.user.id}",
            self.channel_name
        )

    @database_sync_to_async
    def get_user_by_id(self, user_id):
        return User.objects.get(id=user_id)

    @database_sync_to_async
    def create_friend(self, user, friend):
        return Friend.objects.create(user=user, friend=friend)

    @database_sync_to_async
    def create_notification(self, user, message):
        return Notification.objects.create(user=user, message=message)

    @database_sync_to_async
    def get_user(self, token):
        try:
            access_token = AccessToken.objects.get(token=token)
            if access_token.is_valid():
                return access_token.user
            else:
                return AnonymousUser()
        except AccessToken.DoesNotExist:
            return AnonymousUser()

    async def receive(self, text_data):
        data = json.loads(text_data)
        action = data.get('action')
        friend_id = data.get('friend_id')
        if action == 'send_friend_request' and friend_id:
            try:
                friend = await self.get_user_by_id(friend_id)
                await self.create_friend(self.user, friend)
                await self.create_notification(
                    friend,
                    f"{self.user.username} sent you a friend request."
                )
                await self.channel_layer.group_send(
                    f"user_{friend.id}",
                    {
                        'type': 'friend_request_sent',
                        'sender_id': self.user.id,
                        'sender_name': self.user.username,
                        'message': f"{self.user.username} just follow you"
                    }
                )
            except User.DoesNotExist:
                pass

    async def friend_request_sent(self, event):
        message = event['message']
        print(message)
        await self.send(text_data=json.dumps({
            'type': 'notification',
            'message': message
        }))











