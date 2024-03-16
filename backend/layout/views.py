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

# Create your views here.

class LayoutAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

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
        
class LayoutList(ListView):
    def get(self, request):
        layouts = Layout.objects.all()
        return render(request, 'layouts/list.html', {'layouts': layouts})

class LayoutCreateView(View):
    def get(self, request):
        form = LayoutForm()
        return render(request, 'layouts/create.html', {'form': form})

    def post(self, request):
        form = LayoutForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect(reverse_lazy('layout:layout-list'))
        return render(request, 'layouts/create.html', {'form': form})

class LayoutEditView(View):
    def get(self, request, pk):
        layout = Layout.objects.get(id=pk)
        form = LayoutForm(instance=layout)
        return render(request, 'layouts/edit.html', {'form': form})

    def post(self, request, pk):
        layout = Layout.objects.get(id=pk)
        form = LayoutForm(request.POST, request.FILES, instance=layout)
        if form.is_valid():
            form.save()
            return redirect(reverse_lazy('layout:layout-list'))
        return render(request, 'layouts/edit.html', {'form': form})