import requests
from django.shortcuts import render, redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Payment
from .serializers import PaymentSerializer
from django.views import View
from django.views.generic import ListView, DetailView, CreateView
from django.http import HttpRequest, HttpResponse
from django.urls import reverse_lazy
from .forms import PaymentForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib import messages

# Create your views here.


class PaymentAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        payments = Payment.objects.all()
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = PaymentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PaymentDetailAPI(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk, *args, **kwargs):
        payment = Payment.objects.get(id=pk)
        serializer = PaymentSerializer(payment)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk, *args, **kwargs):
        payment = Payment.objects.get(id=pk)
        serializer = PaymentSerializer(instance=payment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        payment = Payment.objects.get(id=pk)
        payment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PaymentList(LoginRequiredMixin, ListView):
    def get(self, request):
        payments = Payment.objects.all()
        return render(request, "payments/list.html", {"payments": payments})


class PaymentCreateView(LoginRequiredMixin, View):
    def get(self, request):
        form = PaymentForm()
        return render(request, "payments/add.html", {"form": form})

    def post(self, request):
        form = PaymentForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("payments")
        else:
            messages.error(request, form.errors)
        return render(request, "payments/add.html", {"form": form})


class PaymentEditView(LoginRequiredMixin, View):
    def get(self, request, pk):
        payment = Payment.objects.get(id=pk)
        form = PaymentForm(instance=payment)
        return render(request, "payments/edit.html", {"form": form, "payment": payment})

    def post(self, request, pk):
        payment = Payment.objects.get(id=pk)
        form = PaymentForm(request.POST, instance=payment)
        if form.is_valid():
            form.save()
            return redirect("payments")
        else:
            messages.error(request, form.errors)
        return render(request, "payments/edit.html", {"form": form, "payment": payment})
