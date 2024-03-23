import requests
from django.shortcuts import render, redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Layout
from .serializers import LayoutSerializer
from django.views import View
from django.views.generic import ListView, DetailView, CreateView
from django.http import HttpRequest, HttpResponse
from django.urls import reverse_lazy
from .forms import LayoutForm
from django.contrib.auth.mixins import LoginRequiredMixin
from background.models import Background

# Create your views here.

BACKGROUND_API_URL = "http://localhost:8000/backgrounds/api"

POSITION_LIST = ['row-1-1', 'row-1-2', 'row-1-3', 'row-1-4', 'row-1-5']


def get_background_list():
    response = requests.get(BACKGROUND_API_URL)
    if response.status_code == 200:
        return response.json()
    return []

class LayoutAPI(APIView):
    
    def get(self, request, *args, **kwargs):
        layouts = Layout.objects.all()
        serializer = LayoutSerializer(layouts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = LayoutSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LayoutDetailAPI(APIView):
    
        permission_classes = [permissions.IsAuthenticated]
    
        def get(self, request, pk, *args, **kwargs):
            layout = Layout.objects.get(id=pk)
            serializer = LayoutSerializer(layout)
            return Response(serializer.data, status=status.HTTP_200_OK)
    
        def put(self, request, pk, *args, **kwargs):
            layout = Layout.objects.get(id=pk)
            serializer = LayoutSerializer(instance=layout, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
        def delete(self, request, pk, *args, **kwargs):
            layout = Layout.objects.get(id=pk)
            layout.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)


class LayoutByBackgroundAPI(APIView):
    def get(self, request, background, *args, **kwargs):
        background = Background.objects.get(title=background)
        layouts = Layout.objects.filter(background_id=background.id)
        serializer = LayoutSerializer(layouts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
class LayoutList(LoginRequiredMixin, ListView):
    def get(self, request):
        layouts = Layout.objects.all()
        backgrounds = get_background_list()
        return render(request, 'layouts/list.html', {'layouts': layouts, 'backgrounds': backgrounds, 'position_list': POSITION_LIST})

class LayoutCreateView(LoginRequiredMixin, View):
    template_name = 'layouts/add.html'
    def get(self, request):
        form = LayoutForm()
        backgrounds = get_background_list()
        return render(request, self.template_name, {'form': form, 'backgrounds': backgrounds, 'position_list': POSITION_LIST})

    def post(self, request):
        form = LayoutForm(request.POST, request.FILES)
        backgrounds = get_background_list()
        if form.is_valid():
            form.save()
            return redirect(reverse_lazy('layouts'))
        return render(request, self.template_name, {'form': form, 'backgrounds': backgrounds, 'position_list': POSITION_LIST})

class LayoutEditView(LoginRequiredMixin, View):
    def get(self, request, pk):
        layout = Layout.objects.get(id=pk)
        backgrounds = get_background_list()
        form = LayoutForm(instance=layout)
        return render(request, 'layouts/edit.html', {'form': form, 'backgrounds': backgrounds, 'layout': layout, 'position_list': POSITION_LIST})

    def post(self, request, pk):
        layout = Layout.objects.get(id=pk)
        form = LayoutForm(request.POST, request.FILES, instance=layout)
        backgrounds = get_background_list()
        if form.is_valid():
            form.save()
            return redirect(reverse_lazy('layouts'))
        return render(request, 'layouts/edit.html', {'form': form, 'backgrounds': backgrounds, 'layout': layout, 'position_list': POSITION_LIST})