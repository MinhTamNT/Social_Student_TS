from django.urls import include, path
from rest_framework import routers

from SocialApp import views

r = routers.DefaultRouter()
r.register(r'user', views.UserViewSet)
r.register(r'account', views.AccountViewSet)
r.register(r'post', views.PostViewSet)
r.register(r'post/comment', views.CommentViewSet)
r.register('story',views.StoryViewSet)
r.register('follow',views.FriendViewSet)

urlpatterns = [
    path('', include(r.urls))
]