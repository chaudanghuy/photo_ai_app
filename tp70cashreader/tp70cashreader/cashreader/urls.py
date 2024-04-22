# myapp/urls.py

from django.urls import path
from . views import start_arduino_view, stop_arduino_view, money_list



urlpatterns = [
    #path('cashcontrol/', arduino_control, name='arduino-control'),
    path('start/', start_arduino_view, name='start_arduino'),
    path('stop/', stop_arduino_view, name='stop_arduino'),
    
    # Add more endpoints if needed    
    path('money/', money_list, name='money-list-order'),
]