from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Device(models.Model):
     name = models.CharField(max_length=100)
     code = models.TextField()
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