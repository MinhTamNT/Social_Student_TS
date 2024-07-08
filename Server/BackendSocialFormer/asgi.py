
import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from SocialApp.route import websocket_urlpatterns
from channels.layers import get_channel_layer
from SocialApp.channels_oauth_middleware import OAuth2TokenMiddleware
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'BackendSocialFormer.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": OAuth2TokenMiddleware(URLRouter(websocket_urlpatterns)) ,
})
