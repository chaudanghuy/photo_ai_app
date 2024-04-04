import requests
from django.shortcuts import render, redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework.decorators import api_view
from .models import Frame
from .serializers import FrameSerializer
from django.views import View
from .forms import FrameForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib import messages
import os
from django.conf import settings
from django.http import JsonResponse


# Create your views here.
DEVICE_API_URL = "http://localhost:8000/devices/api"

POSITION_FRAMES = ["row-1-1", "row-1-2", "row-1-3", "row-2-1", "row-2-2", "row-2-3"]

def get_device_list():
    response = requests.get(DEVICE_API_URL)
    if response.status_code == 200:
        return response.json()
    return []

@api_view(['POST'])
def upload_full(request):
    if request.method == 'POST':
          image_data = request.POST.get('image')
          if image_data:            
                filename = 'photo.png'
                file_path = os.path.join(settings.BASE_DIR, '../app/public/photo_saved/', filename)
                if os.path.exists(file_path) and os.path.isfile(file_path):
                    os.remove(file_path)
                with open(file_path, 'wb') as f:
                    for chunk in image_data.chunks():
                        f.write(chunk)
                return JsonResponse({
                    'photo_url': f'/photo_saved/{filename}'
                }, status=status.HTTP_201_CREATED)                  
    else:
        return JsonResponse({'error': 'Image not provided'}, status=status.HTTP_400_BAD_REQUEST)


class FrameAPI(APIView):
    
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

class FrameImageCopyAPI(APIView):
    
    def post(self, request, *args, **kwargs):
        photo_url = request.data.get('photo_url')
        photo_cover = request.data.get('photo_cover')
        if photo_url:
            response = requests.get(photo_url)
            if response.status_code == 200:
                filename = os.path.basename(photo_url)
                file_path = os.path.join(settings.BASE_DIR, '../app/public/photos', filename)
                if os.path.exists(file_path) and os.path.isfile(file_path):
                    os.remove(file_path)
                with open(file_path, 'wb') as f:
                    f.write(response.content)

                if photo_cover:
                    response_cover = requests.get(photo_cover)
                    if response_cover.status_code == 200:
                        cover_filename = os.path.basename(photo_cover)
                        cover_path = os.path.join(settings.BASE_DIR, '../app/public/photo_covers', cover_filename)
                        if os.path.exists(cover_path) and os.path.isfile(cover_path):
                            os.remove(cover_path)
                        with open(cover_path, 'wb') as f_cover:
                            f_cover.write(response_cover.content)

                return Response({
                    'photo_path': f'/photos/{filename}',
                    'photo_cover_path': f'/photo_covers/{cover_filename}' if photo_cover else None
                }, status=status.HTTP_201_CREATED)                
        return Response({'error': 'Photo URL is required'}, status=status.HTTP_400_BAD_REQUEST)


class FrameList(LoginRequiredMixin, View):
    template_name = "frames/list.html"

    def get(self, request, *args, **kwargs):
        devices = get_device_list()
        frames = Frame.objects.all()
        return render(
            request, self.template_name, {"devices": devices, "frames": frames}
        )


class FrameCreateView(LoginRequiredMixin, View):
    template_name = "frames/add.html"

    def get(self, request, *args, **kwargs):
        devices = get_device_list()
        form = FrameForm()
        return render(request, self.template_name, {"form": form, "devices": devices, "positions": POSITION_FRAMES})

    def post(self, request, *args, **kwargs):
        devices = get_device_list()
        form = FrameForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect("frames")
        else:
            messages.error(request, form.errors)
        return render(request, self.template_name, {"form": form, "devices": devices, "positions": POSITION_FRAMES})


class FrameEditView(LoginRequiredMixin, View):
    template_name = "frames/edit.html"

    def get(self, request, pk, *args, **kwargs):
        frame = Frame.objects.get(id=pk)
        devices = get_device_list()
        form = FrameForm(instance=frame)
        return render(
            request,
            self.template_name,
            {"form": form, "frame": frame, "devices": devices, "positions": POSITION_FRAMES},
        )

    def post(self, request, pk):
        frame = Frame.objects.get(id=pk)
        devices = get_device_list()
        form = FrameForm(request.POST, request.FILES, instance=frame)
        if form.is_valid():
            form.save()
            return redirect("frames")
        return render(request, "frames/edit.html", {"form": form, "frame": frame, "devices": devices, "positions": POSITION_FRAMES})
