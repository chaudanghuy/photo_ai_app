from django.db import models
from django.contrib.auth.models import User

class Store(models.Model):
     name = models.CharField(max_length=100)
     address = models.TextField()
     created_at = models.DateTimeField(auto_now_add=True)
     updated_at = models.DateTimeField(auto_now=True)

     def __str__(self):
          return self.name

# Create your models here.
class Device(models.Model):
     name = models.CharField(max_length=100)
     code = models.TextField()
     store = models.ForeignKey(Store, on_delete=models.CASCADE)
     photo_shooting_time = models.TextField()
     photo_suffer_time = models.TextField()
     photo_work_time = models.TextField()
     product_price = models.TextField()
     contact_number = models.TextField     
     user = models.ForeignKey(User, on_delete=models.CASCADE)
     created_at = models.DateTimeField(auto_now_add=True)
     updated_at = models.DateTimeField(auto_now=True)
     
     def __str__(self):
          return self.name
     
     class Meta:
          ordering = ['-created_at']

class Frame(models.Model):
     device = models.ForeignKey(Device, on_delete=models.CASCADE)
     title = models.TextField()
     photo = models.ImageField(upload_to='frames/photos/')
     price = models.DecimalField(max_digits=10, decimal_places=2)
     created_at = models.DateTimeField(auto_now_add=True)
     deleted_at = models.DateTimeField(auto_now_add=True)

     def __str__(self):
          return f"Frame for {self.device.name}"