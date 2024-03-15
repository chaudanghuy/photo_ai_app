from django.db import models

# Create your models here.
class Frame(models.Model):
     device_id = models.IntegerField()
     title = models.TextField()
     photo = models.ImageField(upload_to='frames/photos/')
     price = models.DecimalField(max_digits=10, decimal_places=2)
     created_at = models.DateTimeField(auto_now_add=True)
     deleted_at = models.DateTimeField(auto_now_add=True)

     def __str__(self):
          return f"Frame for {self.device.name}"