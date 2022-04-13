from .views import index, login, register, logout
from django.urls import path

urlpatterns = [
    path('', index),
    path('login', login),
    path('register', register),
    path('logout', logout)
]
