import requests
from django.shortcuts import render, redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Filter
from .serializers import FilterSerializer
from django.views import View
from django.views.generic import ListView, DetailView, CreateView
from django.http import HttpRequest, HttpResponse
from django.urls import reverse_lazy
from .forms import FilterForm

# Create your views here.

class LayoutAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        filters = Filter.objects.all()
        serializer = FilterSerializer(filters, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = FilterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LayoutDetailAPI(APIView):
    
        permission_classes = [permissions.IsAuthenticated]
    
        def get(self, request, pk, *args, **kwargs):
            filter = Filter.objects.get(id=pk)
            serializer = FilterSerializer(filter)
            return Response(serializer.data, status=status.HTTP_200_OK)
    
        def put(self, request, pk, *args, **kwargs):
            filter = Filter.objects.get(id=pk)
            serializer = FilterSerializer(instance=filter, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
        def delete(self, request, pk, *args, **kwargs):
            filter = Filter.objects.get(id=pk)
            filter.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        
class LayoutList(ListView):
    def get(self, request):
        filters = Filter.objects.all()
        return render(request, 'filters/filter_list.html', {'filters': filters})

class LayoutCreateView(View):
    def get(self, request):
        form = FilterForm()
        return render(request, 'filters/filter_create.html', {'form': form})

    def post(self, request):
        form = FilterForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect(reverse_lazy('layout:layout-list'))
        return render(request, 'filters/filter_create.html', {'form': form})

class LayoutEditView(View):
    def get(self, request, pk):
        filter = Filter.objects.get(id=pk)
        form = FilterForm(instance=filter)
        return render(request, 'filters/filter_edit.html', {'form': form})

    def post(self, request, pk):
        filter = Filter.objects.get(id=pk)
        form = FilterForm(request.POST, request.FILES, instance=filter)
        if form.is_valid():
            form.save()
            return redirect(reverse_lazy('layout:layout-list'))
        return render(request, 'filters/filter_edit.html', {'form': form})