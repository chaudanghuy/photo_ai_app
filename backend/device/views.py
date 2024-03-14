from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Store, Device, Frame
from .serializers import DeviceSerializer
from django.views import View
from django.views.generic import ListView, DetailView, CreateView
from django.http import HttpResponse
from django.urls import reverse_lazy
from .forms import StoreForm, DeviceForm, FrameForm

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
    
class StoreListView(View):
    def get(self, request):
        stores = Store.objects.all()
        return render(request, 'stores/list.html', {'stores': stores})

class AddStoreView(View):
    def get(self, request):
        form = StoreForm()
        return render(request, 'stores/add.html', {'form': form})

    def post(self, request):
        form = StoreForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('store-list');
        return render(request, 'stores/add.html', {'form': form})

class DeviceList(ListView):
    model = Device
    template_name='devices_list.html'
    context_object_name = 'devices'

class DeviceDetail(DetailView):
    model = Device
    template_name='device_detail.html'
    context_object_name = 'device'

class DeviceCreateView(CreateView):
    model = Device
    template_name='add_device.html'
    fields = '__all__'
    success_url = reverse_lazy('devices')        