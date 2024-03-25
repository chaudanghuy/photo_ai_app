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
    path('api/<str:code>', PaymentDetailAPI.as_view()),       
     
    # WEB
    path('', PaymentList.as_view(), name='payments'),
    path('add', PaymentCreateView.as_view(), name='payments-add'),
    path('edit/<int:pk>', PaymentEditView.as_view(), name='payments-edit')
]