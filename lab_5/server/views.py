from django.shortcuts import render
from django.http import JsonResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
from django.core.serializers import serialize

from .models import Goods, Producers, Basket, User
# Create your views here.

def index(request):
    # if not request.user.is_authenticated:
    #     return HttpResponseRedirect(reverse("login"))
    return render(request,"server/index.html")

def data_json(request):
    goods_data = list(Goods.objects.values('id','name', 'text', 'image', 'producers__compani', 'money'))
    return JsonResponse({'data': goods_data}, safe=False)

def goods(request, goods_id):
    goods = Goods.objects.get(pk = goods_id)
    return render(request, "server/goods.html", {
        "goods": goods
    })

def basket(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("login"))
    if request.method == "POST":
        data = request.POST
        user = request.user
    return render(request, "server/basket.html", {
        "info": data,
        "user":user
    })

def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username = username, password = password)
        
        if user is not None:
            login(request, user)
            users = User.objects.all()
            serialized_users = serialize('json', users)
            with open('server/static/json/user_data.json', 'w') as file:
                file.write(serialized_users)
            return HttpResponseRedirect(reverse("basket"))
        else:
            return render(request, "server/login.html", {
                "message": 'LOX'
            })
        
    return render(request, "server/login.html")

def basket_json(request):
    basket_data = list(Basket.objects.values('id', 'goods__name', 'user__username'))
    return JsonResponse({'data_basket': basket_data}, safe=False)

def logout_view(request):
    logout(request)
    users = User.objects.all()
    serialized_users = serialize('json', users)
    with open('server/static/json/user_data.json', 'w') as file:
        file.write(serialized_users)
    return HttpResponseRedirect(reverse("index"))

def regist(request):
    users = User.objects.all()
    serialized_users = serialize('json', users)
    with open('server/static/json/user_data.json', 'w') as file:
        file.write(serialized_users)
    return