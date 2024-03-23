from django import forms
from .models import Background

class BackgroundForm(forms.ModelForm):
    class Meta:
        model = Background
        fields = ['frame_id', 'title', 'photo', 'photo_hover', 'position']