from .views import index, login, register
from django.urls import path

urlpatterns = [
    path('', index),
    path('login', login),
    path('register', register),
]
