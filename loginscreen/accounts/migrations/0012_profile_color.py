# Generated by Django 4.2.7 on 2023-12-17 02:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0011_remove_profile_color'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='color',
            field=models.CharField(default='default', max_length=100, null=True),
        ),
    ]
