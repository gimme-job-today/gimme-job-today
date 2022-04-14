from .views import index, login, register, logged, offers, addOffer, editOffer, editProfile, profile, passwordChange
from django.urls import path

urlpatterns = [
    path('', index),
    path('logged', logged),
    path('login', login),
    path('register', register),
    path('offers', offers),
    path('add-offer', addOffer),
    path('edit-offer', editOffer),
    path('profile', profile),
    path('edit-profile', editProfile),
    path('password-change', passwordChange),
]
