# Generated by Django 5.0.3 on 2024-03-23 15:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('layout', '0005_rename_background_layout_photo_cover'),
    ]

    operations = [
        migrations.RenameField(
            model_name='layout',
            old_name='photo_cover',
            new_name='photo_hover',
        ),
    ]