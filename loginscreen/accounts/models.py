from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class Profile(models.Model): 
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    sparkles = models.IntegerField(null=True)
    wearing = models.CharField(max_length=100, null=True)
    owns = models.CharField(max_length=100, null=True)

    volume = models.BooleanField(default=True)
    font = models.BooleanField(default=True)
    font_size = models.BooleanField(default=True)
    buttons = models.BooleanField(default=True)
    colors = models.BooleanField(default=True)

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance, sparkles=0, wearing='', owns='')

@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()
