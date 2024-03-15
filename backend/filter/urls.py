from django.urls import path, include
from .views import (
    FilterAPI,
    FilterDetailAPI,
    FilterList,
    FilterCreateView,
    FilterEditView
)

urlpatterns = [
    # API
    path('api', FilterAPI.as_view()),
    path('api/<int:pk>', FilterDetailAPI.as_view()),
    # WEB
    path('list', FilterList.as_view(), name='filter'),
    path('add', FilterCreateView.as_view(), name='filter-add'),
    path('edit/<int:pk>', FilterEditView.as_view(), name='filter-edit')
]