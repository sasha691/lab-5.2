from django.shortcuts import render
from django.http import JsonResponse, HttpResponseRedirect, HttpResponse
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
from django.core.serializers import serialize
import json

from .models import Goods, Producers, Basket, User
# Create your views here.

def index(request):
    # if not request.user.is_authenticated:
    #     return HttpResponseRedirect(reverse("login"))
    return render(request,"server/index.html", {
        'user_info': request.user
    })

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
        tovar_user = request.user
        tovar_id = request.POST.get('id')
        tovar_name = request.POST.get('name')
        tovar_producer = request.POST.get('producer')
        tovar_money = request.POST.get('money')
        tovar_numbers = request.POST.get('numbers')
        if Basket.objects.filter(tovarId = tovar_id).exists():
            existing_tovar = Basket.objects.get(tovarId=tovar_id)
            existing_tovar.number += 1
            existing_tovar.save()
        else:
            new_tovar = Basket(user = tovar_user, tovarId = tovar_id, name = tovar_name, producer = tovar_producer, money = tovar_money, number = tovar_numbers)
            new_tovar.save()

        tovar = Basket.objects.all()
        serialized_tovar = serialize('json', tovar)
        with open('server/static/json/tovar_data.json', 'w') as file:
            file.write(serialized_tovar)

    return render(request, "server/basket.html")

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
            return render(request, "server/login.html", {
                'user_info': request.user
            })
        else:
            return render(request, "server/login.html", {
                "logic": not request.user.is_authenticated,
                "message": 'невірні дані'
            })

    return render(request, "server/login.html", {
        'logic': not request.user.is_authenticated,
        'user_info': request.user
    })
    

def logout_view(request):
    logout(request)
    users = User.objects.all()
    serialized_users = serialize('json', users)
    with open('server/static/json/user_data.json', 'w') as file:
        file.write(serialized_users)
    return HttpResponseRedirect(reverse("index"))

def regist(request):
    if request.method == "POST":
        new_username = request.POST.get('username')
        new_firstname = request.POST.get('firstname')
        new_lastname = request.POST.get('lastname')
        new_password = request.POST.get('password')
        new_email = request.POST.get('email')
        existing_users = User.objects.filter(username = new_username)
        if existing_users.exists():
            return render(request, "server/regist.html", {
                "message": "ім'я користувача вже заняте"
            })
        user = User.objects.create_user(username = new_username, password = new_password)
        user.is_active = True
        user.last_name = new_lastname
        user.email = new_email
        user.first_name = new_firstname
        user.save()

        users = User.objects.all()
        serialized_users = serialize('json', users)
        with open('server/static/json/user_data.json', 'w') as file:
            file.write(serialized_users)
        return HttpResponseRedirect(reverse("login"))
    return render(request, "server/regist.html")