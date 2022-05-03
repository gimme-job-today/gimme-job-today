from .views import index, login, register, logout, offers, addOffer, editOffer, editProfile, profile, passwordChange, profileDelete
from django.urls import path

urlpatterns = [
    path('', index),
    path('login', login),
    path('register', register),
    path('logout', logout),
    path('offers', offers),
    path('add-offer', addOffer),
    path('edit-offer', editOffer),
    path('profile', profile),
    path('edit-profile', editProfile),
    path('password-change', passwordChange),
    path('profile-after-delete',profileDelete)
]
