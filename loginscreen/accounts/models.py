from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class Profile(models.Model): 
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    sparkles = models.IntegerField(null=True)
    wearing = models.CharField(max_length=100, null=True, default='null')
    owns = models.CharField(max_length=100, null=True, default='null') 
    color = models.CharField(max_length=100, null=True, default='default') # set default value code from https://stackoverflow.com/questions/755857/how-can-i-set-a-default-value-for-a-field-in-a-django-model

    volume = models.BooleanField(default=True)
    font = models.BooleanField(default=False)
    font_size = models.BooleanField(default=False)
    buttons = models.BooleanField(default=False)
    colors = models.BooleanField(default=False)

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance, sparkles=0, wearing='', owns='',color='')

@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()
