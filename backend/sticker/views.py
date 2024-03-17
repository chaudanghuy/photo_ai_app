import requests
from django.shortcuts import render, redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Sticker
from .serializers import StickerSerializer
from django.views import View
from django.views.generic import ListView, DetailView, CreateView
from django.http import HttpRequest, HttpResponse
from .forms import StickerForm
from django.contrib.auth.mixins import LoginRequiredMixin

# Create your views here.
class StickerAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        stickers = Sticker.objects.all()
        serializer = StickerSerializer(stickers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)     
    
    def post(self, request, *args, **kwargs):
        serializer = StickerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      
class StickerDetailAPI(APIView):
    
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, pk, *args, **kwargs):
        sticker = Sticker.objects.get(id=pk)
        serializer = StickerSerializer(sticker)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, pk, *args, **kwargs):
        sticker = Sticker.objects.get(id=pk)
        serializer = StickerSerializer(instance=sticker, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, *args, **kwargs):
        sticker = Sticker.objects.get(id=pk)
        sticker.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)      
      
class StickerList(LoginRequiredMixin, ListView):
    model = Sticker
    template_name = 'stickers/list.html'
    context_object_name = 'stickers'      
    
class StickerCreateView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        form = StickerForm()
        return render(request, 'stickers/create.html', {'form': form})
    
    def post(self, request, *args, **kwargs):
        form = StickerForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('sticker-list')
        return render(request, 'stickers/create.html', {'form': form})
      
class StickerEditView(LoginRequiredMixin, View):
    def get(self, request, pk, *args, **kwargs):
        sticker = Sticker.objects.get(id=pk)
        form = StickerForm(instance=sticker)
        return render(request, 'stickers/edit.html', {'form': form})
    
    def post(self, request, pk, *args, **kwargs):
        sticker = Sticker.objects.get(id=pk)
        form = StickerForm(request.POST, request.FILES, instance=sticker)
        if form.is_valid():
            form.save()
            return redirect('sticker-list')
        return render(request, 'stickers/edit.html', {'form': form})