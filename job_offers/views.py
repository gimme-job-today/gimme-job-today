from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'job_offers/index.html')

def logged(request):
    return render(request, 'job_offers/index.html')

def login(request):
    return render(request, 'job_offers/login.html')

def register(request):

    if request.method == 'POST':
        error_messages = []

        company_name = request.POST.get('nameCompany')
        email = request.POST.get('email')
        password = request.POST.get('password')
        passwordRepeat = request.POST.get('passwordRepeat')

        # Checking if user already exists
        try:
            user = User.objects.filter(username=email).first()
            assert user is None
        except AssertionError:
            error_messages.append('User already exists')

        # Checking password are the same
        try:
            assert password
            assert password == passwordRepeat
        except AssertionError:
            error_messages.append('Passwords are not the same')

        # Checking if there is a company name
        try:
            assert company_name
        except AssertionError:
            error_messages.append('No comapny name provided')

        if error_messages:
            return render(request, 'job_offers/register.html', {'error_messages': error_messages})
        else:

            user = User.objects.create(
                username=email,
                email=email,
                password=password
            )

            company = Company.objects.create(
                user=user,
                name=company_name
            )

            auth_login(request, user)

    return render(request, 'job_offers/register.html')

def logout(request):
    return render(request, 'job_offers/logout.html')

def offers(request):
    return render(request, 'job_offers/offers.html')

def profile(request):
    return render(request, 'job_offers/profile.html')

def editProfile(request):
    return render(request, 'job_offers/edit-profile.html')

def addOffer(request):
    return render(request, 'job_offers/add-offer.html')

def editOffer(request):
    return render(request, 'job_offers/edit-offer.html')

def passwordChange(request):
    return render(request, 'job_offers/password-change.html')

def profileDelete(request):
    return render(request, 'job_offers/profile-after-delete.html')
