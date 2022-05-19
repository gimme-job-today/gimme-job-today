from .views import index, login, register, logout, delete_account, offers, addOffer, editOffer, editProfile, profile, passwordChange, passwordChangeConfirm, account_deleted, api__offer_details, api__tags
from django.urls import path

urlpatterns = [
    path('', index, name="index"),
    path('login', login),
    path('register', register),
    path('logout', logout),
    path('delete-account', delete_account, name="delete-account"),
    path('account-deleted', account_deleted, name="account-deleted"),
    path('offers', offers),
    path('add-offer', addOffer),
    path('edit-offer', editOffer),
    path('profile', profile),
    path('edit-profile', editProfile),
    path('password-change', passwordChange),
    path('password-change-confirm', passwordChangeConfirm),

    path('api/offer-details', api__offer_details),
    path('api/tags', api__tags),
]
