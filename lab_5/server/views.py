from django.shortcuts import render
from django.http import JsonResponse

from .models import Goods, Producers
# Create your views here.
def index(request):
    return render(request,"server/index.html")

def data_json(request):
    goods_data = list(Goods.objects.values('name', 'text', 'image', 'producers__compani'))
    return JsonResponse({'data': goods_data}, safe=False)