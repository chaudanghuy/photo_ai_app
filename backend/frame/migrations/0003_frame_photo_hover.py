# Generated by Django 5.0.3 on 2024-03-23 02:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frame', '0002_alter_frame_photo'),
    ]

    operations = [
        migrations.AddField(
            model_name='frame',
            name='photo_hover',
            field=models.ImageField(default='frames/default.png', upload_to='frames'),
        ),
    ]
