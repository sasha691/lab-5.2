# Generated by Django 4.2.6 on 2023-12-03 21:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0003_basket'),
    ]

    operations = [
        migrations.RenameField(
            model_name='basket',
            old_name='producers',
            new_name='producer',
        ),
    ]
