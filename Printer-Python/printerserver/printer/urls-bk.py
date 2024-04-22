from django.urls import path
from . import views
from . views import switch_printer_profile


urlpatterns = [
    path('switch-printer/<str:profile_name>/', views.switch_printer_profile, name='switch_printer_profile'),
    
]