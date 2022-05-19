from .views import index, login, register, logout, delete_account, offers, addOffer, editOffer, editProfile, profile, account_deleted, api__offer_details

from .classes import CustomPasswordResetView, CustomPasswordResetDoneView, CustomPasswordResetConfirmView, CustomPasswordResetCompleteView

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

    path('api/offer-details', api__offer_details),

    path('password-reset/', CustomPasswordResetView.as_view(), name='password_reset'),
    path('password-reset/done/', CustomPasswordResetDoneView.as_view(), name='password_reset_done'),
    path('password-reset/reset/<uidb64>/<token>/', CustomPasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('password-reset/complete/', CustomPasswordResetCompleteView.as_view(), name='password_reset_complete'),
]
