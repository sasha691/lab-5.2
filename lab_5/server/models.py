from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Producers(models.Model):
    compani = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.compani}"

class Goods(models.Model):
    name = models.CharField(max_length=64)
    image = models.ImageField(upload_to='server/static/images/')
    text = models.TextField()
    producers = models.ForeignKey(Producers, on_delete=models.CASCADE, related_name="producers")
    money = models.IntegerField(default = 0)

    def __str__(self):
        return f"Name:{self.name} Producers:{self.producers} Money:{self.money}"
    
class Basket(models.Model):
    tovar = models.ForeignKey(Goods, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
