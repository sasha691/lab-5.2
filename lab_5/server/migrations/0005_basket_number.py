# Generated by Django 4.2.6 on 2023-12-04 15:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0004_rename_producers_basket_producer'),
    ]

    operations = [
        migrations.AddField(
            model_name='basket',
            name='number',
            field=models.IntegerField(default=1),
        ),
    ]
