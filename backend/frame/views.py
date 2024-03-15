import requests
from django.shortcuts import render, redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Frame
from .serializers import FrameSerializer
from django.views import View
from .forms import FrameForm


# Create your views here.
DEVICE_API_URL = 'http://localhost:8000/devices/api/'

def get_device_list():
    response = requests.get(DEVICE_API_URL)
    if response.status_code == 200:
        return response.json().get('devices', [])
    return []

class FrameAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        frames = Frame.objects.all()
        serializer = FrameSerializer(frames, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)     
    
    def post(self, request, *args, **kwargs):
        serializer = FrameSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class FrameDetailAPI(APIView):
    
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, pk, *args, **kwargs):
        frame = Frame.objects.get(id=pk)
        serializer = FrameSerializer(frame)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, pk, *args, **kwargs):
        frame = Frame.objects.get(id=pk)
        serializer = FrameSerializer(instance=frame, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, *args, **kwargs):
        frame = Frame.objects.get(id=pk)
        frame.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class FrameList(View):
     template_name = 'frame/list.html'
     def get(self, request, *args, **kwargs):
          devices = get_device_list()
          frames = Frame.objects.all()
          return render(request, self.template_name, {'devices': devices, 'frames': frames})
      
class FrameCreateView(View):
     template_name = 'frame/add.html'
     def get(self, request, *args, **kwargs):
          devices = get_device_list()
          form = FrameForm()
          return render(request, self.template_name, {'form': form, 'devices': devices})
     
     def post(self, request, *args, **kwargs):
          form = FrameForm(request.POST)
          if form.is_valid():
               form.save()
               return redirect('frames')
          return render(request, 'frame/add.html', {'form': form})

class FrameEditView(View):
    template_name = 'frame/edit.html'
    def get(self, request, pk, *args, **kwargs):        
          frame = Frame.objects.get(id=pk)
          devices = get_device_list()
          form = FrameForm(instance=frame)
          return render(request, self.template_name, {'form': form, 'frame': frame, 'devices': devices})      
    
    def post(self, request, pk):
          frame = Frame.objects.get(id=pk)
          form = FrameForm(request.POST, instance=frame)
          if form.is_valid():
               form.save()
               return redirect('frames')
          return render(request, 'frame/edit.html', {'form': form, 'frame': frame})