from django.shortcuts import render
from django.http import JsonResponse, HttpResponseRedirect
from django.urls import reverse

from .models import Goods, Producers
# Create your views here.
def index(request):
    return render(request,"server/index.html")

def data_json(request):
    goods_data = list(Goods.objects.values('id','name', 'text', 'image', 'producers__compani', 'money'))
    return JsonResponse({'data': goods_data}, safe=False)

def goods(request, goods_id):
    goods = Goods.objects.get(pk = goods_id)
    return render(request, "server/goods.html", {
        "goods": goods
    })