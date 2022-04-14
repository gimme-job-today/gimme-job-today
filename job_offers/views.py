from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'job_offers/index.html')

def logged(request):
    return render(request, 'job_offers/index.html', {'isLogged': True})

def login(request):
    return render(request, 'job_offers/login.html')

def register(request):
    return render(request, 'job_offers/register.html')

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