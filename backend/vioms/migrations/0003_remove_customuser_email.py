# Generated by Django 5.2.4 on 2025-07-21 09:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('vioms', '0002_remove_customuser_date_joined_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='email',
        ),
    ]
