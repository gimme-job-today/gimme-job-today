from django.contrib.auth.forms import PasswordResetForm, SetPasswordForm

class CustomPasswordResetForm(PasswordResetForm):

    class Meta:
        fields = ['email']

    def __init__(self, *args, **kwargs):
        super(CustomPasswordResetForm, self).__init__(*args, **kwargs)
        self.fields['email'].widget.attrs.update({'class' : 'Email', 'placeholder' : 'Email'})
        self.fields['email'].required = True


class CustomSetPasswordForm(SetPasswordForm):

    class Meta:
        fields = ['new_password1','new_password2']

    def __init__(self, *args, **kwargs):
        super(CustomSetPasswordForm, self).__init__(*args, **kwargs)
        self.fields['new_password1'].widget.attrs.update({'class' : 'Password', 'placeholder' : 'Nowe hasło'})
        self.fields['new_password2'].widget.attrs.update({'class' : 'Password', 'placeholder' : 'Powtórz nowe hasło'})
