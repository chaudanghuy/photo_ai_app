from django import forms
from .models import Store, Device, Frame

class StoreForm(forms.ModelForm):
    class Meta:
        model = Store
        fields = ['name', 'address']

class DeviceForm(forms.ModelForm):
    class Meta:
        model = Device
        fields = ['name', 'code', 'store', 'photo_working_time', 'contact_number', 'status']

class FrameForm(forms.ModelForm):
    class Meta:
        model = Frame
        fields = ['device', 'title', 'photo', 'price']