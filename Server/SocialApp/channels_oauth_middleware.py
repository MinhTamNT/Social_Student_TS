# SocialApp/channels_oauth_middleware.py

from channels.middleware import BaseMiddleware
from channels.db import database_sync_to_async
from django.utils import timezone
from oauth2_provider.models import AccessToken
from django.contrib.auth.models import AnonymousUser

class OAuth2TokenMiddleware(BaseMiddleware):
    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        token_key = self.get_token_from_scope(scope)
        scope['user'] = await self.get_user(token_key)

        return await super().__call__(scope, receive, send)

    def get_token_from_scope(self, scope):
        query_string = scope.get('query_string', b'').decode()
        token_key = query_string.split('=')[1] if query_string else None
        return token_key

    @database_sync_to_async
    def get_user(self, token_key):
        try:
            if token_key:
                token = AccessToken.objects.get(token=token_key, expires__gt=timezone.now())
                if token.is_valid():
                    return token.user
                else:
                    return AnonymousUser()
            else:
                return AnonymousUser()
        except AccessToken.DoesNotExist:
            return AnonymousUser()
