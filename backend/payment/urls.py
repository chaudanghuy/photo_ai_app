from django.urls import path, include
from .views import (
    PaymentAPI,
    PaymentDetailAPI,
    PaymentList,
    PaymentCreateView,
    PaymentEditView
)

urlpatterns = [
    # API
    path('api', PaymentAPI.as_view()),
    path('api/<int:pk>', PaymentDetailAPI.as_view()),
    # WEB
    path('list', PaymentList.as_view(), name='payment'),
    path('add', PaymentCreateView.as_view(), name='payment-add'),
    path('edit/<int:pk>', PaymentEditView.as_view(), name='payment-edit')
]