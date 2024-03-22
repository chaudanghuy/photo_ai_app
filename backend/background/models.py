from django.db import models
from frame.models import Frame

# Create your models here.
class Background(models.Model):
    frame_id = models.ForeignKey(Frame, on_delete=models.CASCADE)
    title = models.TextField()
    photo = models.ImageField(upload_to='backgrounds')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title