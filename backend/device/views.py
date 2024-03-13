from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Device
from .serializers import DeviceSerializer

# Create your views here.
def home(request):
    return render(request, 'home.html')