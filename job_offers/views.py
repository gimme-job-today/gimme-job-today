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

def logout(request):
    return render(request, 'job_offers/logout.html')
    
def offers(request):
    return render(request, 'job_offers/offers.html', {'isLogged': True})

def profile(request):
    return render(request, 'job_offers/profile.html', {'isLogged': True})

def editProfile(request):
    return render(request, 'job_offers/edit-profile.html', {'isLogged': True})

def addOffer(request):
    return render(request, 'job_offers/add-offer.html', {'isLogged': True})

def editOffer(request):
    return render(request, 'job_offers/edit-offer.html', {'isLogged': True})

def passwordChange(request):
    return render(request, 'job_offers/password-change.html')

def profileDelete(request):
    return render(request, 'job_offers/profile-after-delete.html')
