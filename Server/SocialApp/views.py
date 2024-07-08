import random
from django.core.mail import send_mail
from django.core.cache import cache
from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status, generics, parsers, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
import cloudinary.uploader
from django.utils.crypto import get_random_string
from BackendSocialFormer.celery import send_otp
from SocialApp import perms
from SocialApp.models import User, Post, PostMedia, Comment, ReactionPost,Story,Friend,StoryMedia
from SocialApp.serializers import FormerSerializer, PostSerializer, CommentSerializer, \
    ReactionSerializer,StorySerializer,FriendSerializer,PostMediaSerializer
from SocialApp.pagination import CustomPageNumberPagination,CutomPageFriendsPagination
import requests
class UserViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = FormerSerializer
    parser_classes = [parsers.MultiPartParser, ]

    @action(methods=['GET', 'PATCH'], detail=False, url_path='current-user')
    def current_user(self, request):
        try:
            user = request.user
            user_instance = User.objects.get(username=user)

            if request.method == 'GET':
                return Response(data=FormerSerializer(user_instance, context={'request': request}).data,
                                status=status.HTTP_200_OK)

            elif request.method == 'PATCH':
                avatar_user = request.data.get('avatar_user')
                cover_photo = request.data.get('cover_photo')

                # Save current cloud URLs
                current_avatar_url = user_instance.avatar_user
                current_cover_url = user_instance.cover_photo

                if avatar_user is not None:
                    upload_result = cloudinary.uploader.upload(avatar_user)
                    user_instance.avatar_user = upload_result['secure_url']
                else:
                    user_instance.avatar_user = current_avatar_url

                if cover_photo is not None:
                    upload_result = cloudinary.uploader.upload(cover_photo)
                    user_instance.cover_photo = upload_result['secure_url']
                else:
                    user_instance.cover_photo = current_cover_url

                user_instance.save()

                return Response(data=FormerSerializer(user_instance, context={'request': request}).data,
                                status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response(data={'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

    @action(methods=['GET'], detail=True, url_path='get-user')
    def get_user_by_id(self, request, pk=None):
        try:
            user_instance = User.objects.filter(id=pk).first()
            if user_instance:
                return Response(data=FormerSerializer(user_instance, context={'request': request}).data,
                                status=status.HTTP_200_OK)
            else:
                return Response({'Error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f"Error: {str(e)}")
            return Response({'Error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AccountViewSet(viewsets.ViewSet):
    queryset = User.objects.all()

    @action(methods=['post'], detail=False, url_path='former/register')
    def former_register(self, request):
        try:
            data = request.data
            username = data.get('username')
            email = data.get('email')

            if User.objects.filter(username=username).exists():
                return Response({'Error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

            if User.objects.filter(email=email).exists():
                return Response({'Error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
            res = cloudinary.uploader.upload(data.get('avatar'), folder='avatar_user/')
            new_former = User.objects.create_user(
                username=username,
                password=data.get('password'),
                avatar_user=res['secure_url'],
                email=email,
                first_name=data.get('first_name'),
                last_name=data.get('last_name'),
                role=User.Roles.FORMER
            )

            return Response(data=FormerSerializer(new_former, context={'request': request}).data,
                            status=status.HTTP_201_CREATED)
        except Exception as e:
            print(f"Error: {str(e)}")
            return Response({'Error': 'Error creating user'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    @action(methods=['post'], detail=False, url_path='send-reset-code')
    def send_reset_code(self, request):
        email = request.data.get('email')
        user = User.objects.filter(email=email).first()
        if not user:
            return Response({"error": "User with this email does not exist"}, status=status.HTTP_400_BAD_REQUEST)

        code = get_random_string(length=6, allowed_chars='0123456789')
        cache.set(f'password_reset_{email}', code, timeout=3600)  # store code for 1 hour

        send_mail(
            'Your Password Reset Code',
            f'Your password reset code is {code} in around 1 hours',
            'minhtam78945@gmail.com',
            [email],
            fail_silently=False,
        )

        return Response({"message": "Password reset code sent"}, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=False, url_path='reset-password')
    def reset_password(self, request):
        email = request.data.get('email')
        print(email)
        code = request.data.get('code')
        new_password = request.data.get('new_password')
        print(code)
        print(new_password)
        if not email or not code or not new_password:
            return Response({"error": "Email, code, and new password are required"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(email=email).first()
        if not user:
            return Response({"error": "Invalid email or code"}, status=status.HTTP_400_BAD_REQUEST)

        cached_code = cache.get(f'password_reset_{email}')
        if not cached_code or cached_code != code:
            return Response({"error": "Invalid or expired reset code"}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        cache.delete(f'password_reset_{email}')

        return Response({"message": "Password reset successfully"}, status=status.HTTP_200_OK)


class PostViewSet(viewsets.ViewSet, generics.ListAPIView, generics.UpdateAPIView,
                  generics.DestroyAPIView):
    queryset = Post.objects.all().order_by('-id')
    serializer_class = PostSerializer
    pagination_class = CustomPageNumberPagination
    def get_permissions(self):
        if self.action in ['destroy', 'partial_update', 'on_comment']:
            self.permission_classes = [perms.IsOwner]
        return super(PostViewSet, self).get_permissions()

    def destroy(self, request, pk):
        try:
            post = self.get_object()
            post.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            print(f"Error: {str(e)}")
            return Response({str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    @action(methods=['POST'], url_path="create_post", detail=False)
    def create_post(self, request):
        try:
            user = request.user
            data = request.data
            content = data.get('content')
            post = Post.objects.create(
                user=user,
                content=content
            )
            media_files = []
            for media_file in request.FILES.getlist('media_file'):
                uploaded_file = cloudinary.uploader.upload_large(media_file)
                media = PostMedia.objects.create(
                    post=post,
                    media_file=uploaded_file['secure_url']
                )
                media_files.append(media)

            # Serialize the post and its associated media files
            post_serializer = PostSerializer(post, context={'request': request})
            media_serializer = PostMediaSerializer(media_files, many=True, context={'request': request})

            response_data = {
                'post': post_serializer.data,
                'media_files': media_serializer.data
            }

            return Response(data=response_data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(f"Error: {str(e)}")
            return Response({'Error': 'Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



    @action(methods=['post', 'get', 'delete'], detail=True, url_path='reaction')
    def react_to_post(self, request, pk):
        try:
            user = request.user
            post = self.get_object()
            if request.method == 'POST':
                reacted, react = ReactionPost.objects.update_or_create(
                    post=post,
                    user=user,
                    reaction_type=request.data.get('reaction_type')
                )
                if reacted:
                    reacted.reaction_type = request.data.get('reaction_type')
                    reacted.save()

                return Response(data=ReactionSerializer(reacted).data,
                                status=status.HTTP_201_CREATED)
            elif request.method == 'DELETE':
                react = ReactionPost.objects.filter(post=post, user=user)
                react.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f"Error: {str(e)}")
            return Response({str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(methods=["post", "get"], detail=True, url_path='comment')
    def comment_post(self, request, pk):
        try:
            user = request.user
            post = self.get_object()
            if request.method == "GET":
                comment = Comment.objects.filter(Q(post=post) & Q(parent_comment__isnull=True))
                return Response(data=CommentSerializer(comment, many=True, context={'request': request}).data,
                                status=status.HTTP_200_OK)
            elif request.method == "POST":
                comment_text = request.data.get('comment')

                response = requests.post('http://127.0.0.1:5000/api/classification_text', json={'text': comment_text})

                if response.status_code == 200:
                    classification_result = response.json().get('result')
                else:
                    classification_result = "Neutral"

                comment = Comment.objects.create(
                    user=user,
                    post=self.get_object(),
                    comment=comment_text,
                    classify=classification_result
                )

                return Response(data=CommentSerializer(comment, context={'request': request}).data,
                                status=status.HTTP_201_CREATED)
            else:
                return Response({}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f"Error: {str(e)}")
            return Response({str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(methods=['put'], detail=True, url_path='on_comment')
    def on_comment(self, request, pk):
        try:
            post = self.get_object()
            if post.on_comment == True:
                post.on_comment = False
                post.save()
            else:
                post.on_comment = True
                post.save()
            return Response(data=PostSerializer(post, context={'request': request}).data,
                            status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Error: {str(e)}")
            return Response({str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(methods=['GET'],detail=False,url_path="search")
    def search_post(self,request):
        try:
            query = request.query_params.get('query', '')
            posts = Post.objects.filter(Q(content__icontains=query) | Q(user__username__icontains=query))
            serializer = PostSerializer(posts, many=True, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Error: {str(e)}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(methods=['GET'], detail=True, url_path="posts-of-user")
    def posts_of_user(self, request, pk=None):
        try:
            user_id = pk  # Assuming pk is the user_id of the friend
            if user_id:
                posts = Post.objects.filter(user_id=user_id)
                serializer = PostSerializer(posts, many=True, context={'request': request})
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'User ID is required'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f"Error: {str(e)}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CommentViewSet(viewsets.ViewSet, generics.UpdateAPIView, generics.DestroyAPIView):
    queryset = Comment.objects.filter(parent_comment__isnull=True)
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            self.permission_classes = [perms.IsOwner]
        return super(CommentViewSet, self).get_permissions()

    def partial_update(self, request, pk):
        try:
            user = request.user
            comment = Comment.objects.get(pk=pk)
            if user == comment.user:
                comment.comment = request.data.get('comment')
                comment.save()
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
            return Response(data=CommentSerializer(comment, context={'request': request}).data,
                            status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Error: {str(e)}")
            return Response({str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def destroy(self, request, pk):
        try:
            comment = self.get_object()
            comment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            print(f"Error: {str(e)}")
            return Response({str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(methods=['post', 'get'], detail=True, url_path='reply')
    def reply(self, request, pk):
        try:
            user = request.user
            parent = Comment.objects.get(pk=pk)
            post = parent.post
            if request.method.__eq__('POST'):
                comment_text = request.data.get('comment')

                # Call the Flask API for text classification
                response = requests.post(
                    'http://localhost:5000/api/classification_text',
                    json={'text': comment_text}
                )

                if response.status_code == 200:
                    sentiment = response.json().get('result')
                    reply = Comment.objects.create(
                        user=user,
                        post=post,
                        comment=comment_text,
                        parent_comment=parent,
                        classify=sentiment
                    )
                    return Response(data=CommentSerializer(reply).data, status=status.HTTP_201_CREATED)
                else:
                    return Response({'error': 'Failed to classify text'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            elif request.method.__eq__('GET'):
                replies = Comment.objects.filter(parent_comment=parent)
                return Response(data=CommentSerializer(replies, many=True).data, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f"Error: {str(e)}")
            return Response({str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class StoryViewSet(viewsets.ViewSet,generics.ListAPIView):
    queryset = Story.objects.all()
    serializer_class = StorySerializer
    permission_classes = [permissions.IsAuthenticated]
    @action(detail=False, methods=['POST'], url_path='create_story')
    def create_story(self, request):
        try:
            user = request.user
            if 'media_files' not in request.FILES or len(request.FILES.getlist('media_files')) == 0:
                return Response({"error": "At least one media file (image or video) is required."},
                                status=status.HTTP_400_BAD_REQUEST)

            story = Story.objects.create(user=user)
            uploaded_files = request.FILES.getlist('media_files')
            for uploaded_file in uploaded_files:
                media_type = 'image' if uploaded_file.content_type.startswith('image') else 'video'

                if media_type == 'video':
                    upload_result = cloudinary.uploader.upload_large(uploaded_file)
                    media_url = upload_result['secure_url']
                else:
                    upload_result = cloudinary.uploader.upload(uploaded_file)
                    media_url = upload_result['secure_url']

                story_media = StoryMedia.objects.create(
                    story=story,
                    media_type=media_type,
                    media_file=media_url
                )

            return Response({"message": "Story created successfully.", "video_url": media_url}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class FriendViewSet(viewsets.ViewSet,generics.ListAPIView):
    queryset = Friend.objects.all()
    serializer_class = FriendSerializer
    pagination_class = CutomPageFriendsPagination

    @action(detail=True, methods=['delete'],url_path='remove_friend')
    def remove_follow(self, request, pk):
        user = request.user
        user_to_unfollow = get_object_or_404(User, pk=pk)
        follow_relation = Friend.objects.filter(user=user, friend=user_to_unfollow).first()

        if follow_relation:
            follow_relation.delete()
            return Response({"detail": "Unfollowed successfully."}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"detail": "Follow relationship does not exist."}, status=status.HTTP_404_NOT_FOUND)

    @action(methods=['GET'], detail=True, url_path='get_friends')
    def get_friends(self, request, pk):
        try:
            user = request.user
            find_friend = get_object_or_404(User, pk=pk)
            friends = Friend.objects.filter(user=find_friend)
            serializer = FriendSerializer(friends, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

