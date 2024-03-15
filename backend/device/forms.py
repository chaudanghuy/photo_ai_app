from django import forms
from .models import Device

class DeviceForm(forms.ModelForm):
    class Meta:
        model = Device
        fields = ['name', 'code', 'store', 'photo_working_time', 'contact_number', 'status']