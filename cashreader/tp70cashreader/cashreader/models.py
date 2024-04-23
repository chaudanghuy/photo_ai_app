from django.db import models

# Create your models here.
class Money(models.Model):
    order_code = models.CharField(max_length=100)
    money = models.DecimalField(max_digits=10, decimal_places=0)
    date_created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.order_code} - {self.money}"