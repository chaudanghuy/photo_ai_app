import requests
from django.shortcuts import render, redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Device
from .serializers import DeviceSerializer
from django.views import View
from django.views.generic import ListView, DetailView, CreateView
from django.http import HttpRequest, HttpResponse
from django.urls import reverse_lazy
from .forms import DeviceForm
from django.contrib.auth.mixins import LoginRequiredMixin

STORE_API_URL = 'http://localhost:8000/stores/api/'

def get_store_list():
    response = requests.get(STORE_API_URL)
    if response.status_code == 200:
        return response.json().get('stores', [])
    return []

# Create your views here.
class DeviceAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        devices = Device.objects.all()
        serializer = DeviceSerializer(devices, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)     
    
    def post(self, request, *args, **kwargs):
        serializer = DeviceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class DeviceDetailAPI(APIView):
    
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, pk, *args, **kwargs):
        device = Device.objects.get(id=pk)
        serializer = DeviceSerializer(device)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, pk, *args, **kwargs):
        device = Device.objects.get(id=pk)
        serializer = DeviceSerializer(instance=device, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, *args, **kwargs):
        device = Device.objects.get(id=pk)
        device.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class DeviceList(LoginRequiredMixin, ListView):    
    def get(self, request):
        stores = get_store_list()
        devices = Device.objects.all()        
        return render(request, 'devices/list.html', {'stores': stores, 'devices': devices})

class DeviceCreateView(View):
    def get(self, request):
        form = DeviceForm()
        return render(request, 'devices/add.html', {'form': form})
    
    def post(self, request):
        form = DeviceForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('devices')
        return render(request, 'devices/add.html', {'form': form})    
    
class DeviceEditView(LoginRequiredMixin, View):
    def get(self, request, pk):
        device = Device.objects.get(id=pk)
        form = DeviceForm(instance=device)
        return render(request, 'devices/edit.html', {'form': form, 'device': device})
    
    def post(self, request, pk):
        device = Device.objects.get(id=pk)
        form = DeviceForm(request.POST, instance=device)
        if form.is_valid():
            form.save()
            return redirect('devices')
        return render(request, 'devices/edit.html', {'form': form, 'device': device})