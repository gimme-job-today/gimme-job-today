from django.contrib.auth import views as auth_views

from .forms import CustomPasswordResetForm, CustomSetPasswordForm

class CustomPasswordResetView(auth_views.PasswordResetView):

    template_name = 'job_offers/password-reset.html'

    html_email_template_name = 'job_offers/password-reset__email__template.html'

    subject_template_name = 'job_offers/password-reset__email__subject.txt'

    form_class = CustomPasswordResetForm


class CustomPasswordResetDoneView(auth_views.PasswordResetDoneView):

    template_name = 'job_offers/password-reset--done.html'


class CustomPasswordResetConfirmView(auth_views.PasswordResetConfirmView):

    template_name = 'job_offers/password-reset--confirm.html'

    form_class = CustomSetPasswordForm


class CustomPasswordResetCompleteView(auth_views.PasswordResetCompleteView):

    template_name = 'job_offers/password-reset--complete.html'
