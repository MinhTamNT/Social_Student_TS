
from rest_framework import viewsets, status, generics, parsers
from rest_framework.decorators import action
from .permision import OwnerAuAuthenticate
from rest_framework.response import Response
from rest_framework import  permissions
from .models import *
from .serializers import UserSerializer, CommentSerializer, AccommodationSerializer, PostSerializer, ImageSerializer
import cloudinary.uploader
from rest_framework.parsers import MultiPartParser, FormParser
from django.db import IntegrityError
from oauth2_provider.models import AccessToken, RefreshToken
from django.contrib.auth import logout
class UserViewSet(viewsets.ModelViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny()]

    def get_permissions(self):
        if self.action in ['update_user','detail_user']:
            return [permissions.IsAuthenticated()]
        return self.permission_classes

    @action(methods=['POST'], detail=False , url_path='register', url_name='register')
    def register_user(self, request):
        try:
            data = request.data
            role = request.data.get('role')
            avatar = request.data.get('avatar_user')

            if role in [User.Role.HOST, User.Role.TENANT] and not avatar:
                return Response({'error': 'Avatar user not found'}, status=status.HTTP_400_BAD_REQUEST)

            res = cloudinary.uploader.upload(data.get('avatar_user'), folder = 'avatar_user/')
            try:
                new_user = User.objects.create_user(
                    first_name=data.get('first_name'),
                    last_name=data.get('last_name'),
                    username=data.get('username'),
                    email=data.get('email'),
                    password=data.get('password'),
                    phone = data.get('phone'),
                    role = role,
                    avatar_user=res['secure_url'],
                )
            except IntegrityError as err:
                print(err)

            return Response(data=UserSerializer(new_user, context={'request': request}).data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(f"Error: {str(e)}")
            return Response({'error': 'Error creating user'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(methods=['PATCH'],detail=True,url_path='update_user')
    def update_user(self,request,pk):
        try:
            user_instance = self.get_object()
            avatar_file = request.data.get('avatar_user')
            for field, value in request.data.items():
                setattr(user_instance, field, value)
            if avatar_file:
                res = cloudinary.uploader.upload(avatar_file, folder='avatar_user/')
                user_instance.avatar_user = res['secure_url']
            user_instance.save()
            return Response(data=UserSerializer(user_instance, context={'request': request}).data,
                            status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Error: {str(e)}")
            return Response({'error': 'Error updating user'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    @action(methods=['GET'],detail=True,url_path='profile')
    def detail_user(self,request,pk):
        try:
            user = self.get_object()
            serialized_user = UserSerializer(user, context={'request': request}).data
            return Response(data=serialized_user, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Error: {str(e)}")
            return Response({'error': 'Error updating user'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    @action(methods=['get'], url_path='current_user' ,url_name='current_user', detail=False)
    def current_user(self, request):
        return Response(UserSerializer(request.user).data)

    @action(methods=['POST'], detail=False, url_path='logout', url_name='logout')
    def logout_user(self, request):
        try:
            # Revoke the OAuth2 access token
            access_token_string = request.headers.get('Authorization', '').replace('Bearer ', '')
            AccessToken.objects.filter(token=access_token_string).delete()

            # Revoke the OAuth2 refresh token
            refresh_token_string = request.data.get('refresh_token')
            if refresh_token_string:
                RefreshToken.objects.filter(token=refresh_token_string).delete()

            # Logout the user
            logout(request)

            return Response({'success': 'User logged out successfully'}, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Error: {str(e)}")
            return Response({'error': 'Error logging out user'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class PostViewSet(viewsets.ModelViewSet, generics.ListAPIView, generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    parser_classes=[MultiPartParser,FormParser]
    @action(methods=['POST'], detail=False, url_path='create_post', url_name='create-post')
    def create_post(self, request):
        try:
            content = request.data.get('content')
            user = request.user
            accommodation =  Accommodation.objects.get(pk=request.data.get('accommodation'))
            post_data =  Post.objects.create(
                content = content,
                user_post =  user,
                accommodation =  accommodation,
            )

            for files in request.FILES.getlist('image'):
                image_post = cloudinary.uploader.upload(files, folder='post_image/')
                image_post_url = image_post['secure_url']
                Image.objects.create(
                    image = image_post_url,
                    post =  post_data
                )
            return Response(data=PostSerializer(post_data).data, status=status.HTTP_201_CREATED)

        except Exception as e:
            print(f"Error: {str(e)}")
            return Response({'error': 'Error creating post'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ImageViewSet(viewsets.ModelViewSet, generics.ListAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

class AccommodationViewSet(viewsets.ModelViewSet, generics.ListAPIView):
    queryset = Accommodation.objects.all()
    serializer_class = AccommodationSerializer

class CommentViewSet(viewsets.ModelViewSet, generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
