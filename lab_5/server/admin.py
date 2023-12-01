from django.contrib import admin

from .models import Producers, Goods, Basket
# Register your models here.
admin.site.register(Producers)
admin.site.register(Goods)
admin.site.register(Basket)