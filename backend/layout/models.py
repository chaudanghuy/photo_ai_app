from django.db import models
from background.models import Background

# Create your models here.
class Layout(models.Model):
    title = models.TextField()
    background_id = models.ForeignKey(Background, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='layouts')
    photo_cover = models.ImageField(upload_to='layouts', default='layouts/default.png')
    position = models.TextField(default='center')
    created_at = models.DateTimeField(auto_now_add=True)
    deleted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Layout {self.title}"