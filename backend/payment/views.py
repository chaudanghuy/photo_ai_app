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
from django.http import JsonResponse
from revenue.models import Transaction, Order
import random
import string
from django.views.decorators.csrf import csrf_exempt
from device.models import Device
import os
from django.conf import settings

# Create your views here.
def random_string_generator(size=10, chars=string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

@csrf_exempt
def start_cash_pay(request):
    url = settings.API_CASH_READER + '/api/start/'
    payload = {}
    headers = {}
    response = requests.request("POST", url, headers=headers, data=payload)
    print(response.text)


@csrf_exempt
def stop_cash_pay(request):
    try:
        cash_url = settings.API_CASH_READER + '/api/stop/'
        response = requests.post(cash_url, {})
        return JsonResponse({'message': 'Stop'}, status=status.HTTP_200_OK)                
    except Payment.DoesNotExist:
        return JsonResponse({'error': 'Payment not found'}, status=status.HTTP_404_NOT_FOUND)            
    return JsonResponse({'error': 'Error Failed'}, status=status.HTTP_200_OK)           
    
@csrf_exempt
def create_cash_order(request):
        device_code = request.GET.get('device')
        amount = request.GET.get("amount")
        order_code = random_string_generator()        

        order = Order.objects.create(
            order_code=order_code,
            device_id=Device.objects.filter(code=device_code).first(),
            product_price=amount,
            base_price=0,
            tax=0,
            total_price=amount,
            status="Pending",
        )    
        return JsonResponse({'order_code': order_code})    

@csrf_exempt
def webhook_cash_api(request):
        order_code = request.GET.get("order")
        if order_code:
            order = Order.objects.filter(order_code=order_code).first()

        try:
            total_money = 0
            cash_url = settings.API_CASH_READER + '/api/money/'
            response = requests.get(cash_url)
            
            if response.status_code == 200:
                data = response.json()
                total_money = data['total_money']
                if (int(total_money) >= order.total_price):
                    Transaction.objects.create(
                        order_id=order,
                        payment_id=Payment.objects.filter(code='Cash').first(),
                        amount=order.total_price,
                        transaction_status="Success"
                    )
                    return JsonResponse({'total_money': total_money, 'status': 'OK'}, status=status.HTTP_200_OK)           
                return JsonResponse({'total_money': total_money, 'status': 'NOK'})    

            return JsonResponse({'total_money': total_money, 'status': 'NOK'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)    

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

    def get(self, request, code, *args, **kwargs):
        if code is None:
            return Response({'error': 'Code is required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            payment = Payment.objects.get(code=code)
        except Payment.DoesNotExist:
            return Response({'error': 'Payment not found'}, status=status.HTTP_404_NOT_FOUND)    
        serializer = PaymentSerializer(payment)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

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
