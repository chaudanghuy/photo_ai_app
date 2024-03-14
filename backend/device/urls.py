from django.urls import path, include
from .views import (
     DeviceAPI,
     DeviceDetailAPI,
     DeviceList
)

urlpatterns = [
     # API
     path('api', DeviceAPI.as_view()),
     path('api/<int:pk>', DeviceDetailAPI.as_view()),
     # Web 
     path('list', DeviceList.as_view(), name='devices'),
     path('add', DeviceList.as_view(), name='device_add')
]