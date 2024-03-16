from django.db import models

# Create your models here.
class Layout(models.Model):
    title = models.TextField()
    background_id = models.IntegerField()
    photo = models.ImageField(upload_to='layouts/photos/')
    created_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Layout {self.title}"