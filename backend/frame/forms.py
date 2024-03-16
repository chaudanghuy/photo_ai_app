from django import forms
from .models import Frame

class FrameForm(forms.ModelForm):
    class Meta:
        model = Frame
        fields = ['device_id', 'title', 'photo', 'price']