from django import forms
from .models import Payment

class PaymentForm(forms.ModelForm):
    class Meta:
        model = Payment
        fields = ['method', 'name', 'secret_key', 'token', 'is_active']