# Generated by Django 4.2.7 on 2023-12-12 03:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_profile_wearing'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='wearing',
            field=models.CharField(max_length=100, null=True),
        ),
    ]