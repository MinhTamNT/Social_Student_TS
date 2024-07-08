from rest_framework import pagination

class CustomPageNumberPagination(pagination.PageNumberPagination):
    page_size = 20
    page_size_query_param = 'limit'
    max_page_size = 1000
    page_query_param = 'page'

class CutomPageFriendsPagination(pagination.PageNumberPagination):
    page_size = 9
    page_size_query_param = 'limit'
    max_page_size = 1000
    page_query_param = 'page'