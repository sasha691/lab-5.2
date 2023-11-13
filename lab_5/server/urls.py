from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("data/", views.data_json, name="data_json")
]