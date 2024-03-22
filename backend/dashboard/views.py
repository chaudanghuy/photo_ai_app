from django.shortcuts import render
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin
from revenue.models import Order, Transaction
from device.models import Device

# Create your views here.

class Dashboard(LoginRequiredMixin, View):    
    def get(self, request):
        # Transaction
        transactions = Transaction.objects.all()
        total_amount = sum(t.amount for t in transactions)
        
        # Order
        orders = Order.objects.all()
        total_orders = orders.count()
        
        # Device
        devices = Device.objects.all()
        total_devices_online = sum(1 for device in devices if device.status == 'Online')
        
        # Get list of transactions sorted by id
        transactions = Order.objects.order_by('id')
        
        return render(request, 'dashboard.html', {
            'total_amount': total_amount,
            'total_orders': total_orders,
            'total_devices_online': total_devices_online,
            'transactions': transactions
        })