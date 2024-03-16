from django.db import models

# Create your models here.
class Payment(models.Model):
    method = models.TextField()
    name = models.TextField()
    secret_key = models.TextField()
    secret_pass = models.TextField()
    token = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Payment Method {self.name}"