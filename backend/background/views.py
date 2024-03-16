import requests
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Background
from .serializers import BackgroundSerializer
from django.views import View
from django.views.generic import ListView, DetailView, CreateView
from django.http import HttpRequest, HttpResponse
from django.urls import reverse_lazy
from .forms import BackgroundForm

# Create your views here.

FRAME_API_URL = 'http://localhost:8000/frames/api/'

def get_frame_list():
    response = requests.get(FRAME_API_URL)
    if response.status_code == 200:
        return response.json().get('frames', [])
    return []

class BackgroundAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        backgrounds = Background.objects.all()
        serializer = BackgroundSerializer(backgrounds, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)     
    
    def post(self, request, *args, **kwargs):
        serializer = BackgroundSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class BackgroundDetailAPI(APIView):

    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, pk, *args, **kwargs):
        background = Background.objects.get(id=pk)
        serializer = BackgroundSerializer(background)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, pk, *args, **kwargs):
        background = Background.objects.get(id=pk)
        serializer = BackgroundSerializer(instance=background, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, *args, **kwargs):
        background = Background.objects.get(id=pk)
        background.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)        

class BackgroundList(ListView):
    
    def get(self, request):
        frames = get_frame_list()
        backgrounds = Background.objects.all()
        return render(request, 'background/list.html', {'frames': frames})
    
class BackgroundCreateView(View):
    def get(self, request):
        form = BackgroundForm()
        return render(request, 'background/create.html', {'form': form})
    
    def post(self, request):
        form = BackgroundForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return render(request, 'background/create.html', {'form': form})
        return render(request, 'background/create.html', {'form': form})    
    
class BackgroundEditView(View):
    def get(self, request, pk):
        background = Background.objects.get(id=pk)
        form = BackgroundForm(instance=background)
        return render(request, 'background/edit.html', {'form': form})
    
    def post(self, request, pk):
        background = Background.objects.get(id=pk)
        form = BackgroundForm(request.POST, request.FILES, instance=background)
        if form.is_valid():
            form.save()
            return render(request, 'background/edit.html', {'form': form})
        return render(request, 'background/edit.html', {'form': form})    