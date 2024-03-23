from django import forms
from .models import Layout

class LayoutForm(forms.ModelForm):
  class Meta:
    model = Layout
    fields = ['title', 'background_id', 'photo', 'photo_cover', 'position']