from django.urls import re_path

from .consumer import PersonalChatConsumer, FriendConsumer

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<room_name>\w+)/$', PersonalChatConsumer.as_asgi()),
    re_path(r'ws/friend_notification/$', FriendConsumer.as_asgi()),
]
