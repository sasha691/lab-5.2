# Generated by Django 4.2.6 on 2023-11-13 03:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='goods',
            name='image',
            field=models.ImageField(upload_to='server/static/images/'),
        ),
    ]
