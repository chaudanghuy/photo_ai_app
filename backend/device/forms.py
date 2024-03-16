from django import forms
from .models import Device

class DeviceForm(forms.ModelForm):
    class Meta:
        model = Device
        fields = ['name', 'code', 'store_id', 'photo_work_time', 'contact_number', 'status']