from .views import index, login, register, logout, delete_account, offers, addOffer, edit_offer, delete_offer, editProfile, profile, account_deleted, api__offer_details, api__tags

from .classes import CustomPasswordResetView, CustomPasswordResetDoneView, CustomPasswordResetConfirmView, CustomPasswordResetCompleteView

from django.urls import path

urlpatterns = [
    path('', index, name="index"),
    path('login', login),
    path('register', register),
    path('logout', logout, name='logout'),
    path('delete-account', delete_account, name="delete-account"),
    path('account-deleted', account_deleted, name="account-deleted"),
    path('offers', offers, name="offers"),
    path('add-offer', addOffer),
    path('edit-offer/<offer_id>', edit_offer),
    path('delete-offer/<offer_id>', delete_offer, name="delete_offer"),
    path('profile/<company_id>', profile),
    path('edit-profile', editProfile, name='edit_profile'),

    path('api/offer-details', api__offer_details),
    path('api/tags', api__tags),

    path('password-reset/', CustomPasswordResetView.as_view(), name='password_reset'),
    path('password-reset/done/', CustomPasswordResetDoneView.as_view(), name='password_reset_done'),
    path('password-reset/reset/<uidb64>/<token>/', CustomPasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('password-reset/complete/', CustomPasswordResetCompleteView.as_view(), name='password_reset_complete'),
]
