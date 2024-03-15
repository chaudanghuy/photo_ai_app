from django.db import models

# Create your models here.
class Background(models.Model):
    frame_id = models.IntegerField()
    title = models.TextField()
    photo = models.ImageField(upload_to='backgrounds/photos/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title