from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("data/", views.data_json, name="data_json"),
    path("<int:goods_id>", views.goods, name="goods"),
    path("login/", views.login_view, name="login"),
    path("basket/", views.basket, name="basket"),
    path("logout/", views.logout_view, name="logout"),
    path("regist/", views.regist, name="regist")
]