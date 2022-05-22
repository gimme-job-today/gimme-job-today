import uuid

from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import login as auth_login, logout as auth_logout, authenticate as auth_authenticate
from django.contrib.auth.models import User

from job_offers.models import Company, Offer, Tag

# Create your views here.

def index(request):
    context = {}

    offer_objects = Offer.objects.all()
    context["offers"] = offer_objects

    return render(request, 'job_offers/index.html', context)


def login(request):

    if request.user.is_authenticated:
        return redirect('index')

    if request.method == 'POST':
        error_messages = []

        email = request.POST.get('email')
        password = request.POST.get('password')

        user = auth_authenticate(request, username=email, password=password)

        if user is not None:
            auth_login(request, user)
            return redirect('index')
        else:
            error_messages.append('Wrong email or password')
        return render(request, 'job_offers/login.html', {'error_messages': error_messages})

    return render(request, 'job_offers/login.html')

def register(request):

    if request.user.is_authenticated:
        return redirect('index')

    if request.method == 'POST':
        error_messages = {}

        company_name = request.POST.get('nameCompany')
        email = request.POST.get('email')
        password = request.POST.get('password')
        passwordRepeat = request.POST.get('passwordRepeat')

        # Checking if user already exists
        try:
            user = User.objects.filter(username=email).first()
            assert user is None
        except AssertionError:
            error_messages["username"] = "User already exists"

        # Checking password are the same
        try:
            assert password
            assert password == passwordRepeat
        except AssertionError:
            error_messages["password"] = "Passwords are not the same"

        # Checking if there is a company name
        try:
            assert company_name
        except AssertionError:
            error_messages["company"] = "No company name provided"

        if len(error_messages):
            return render(request, 'job_offers/register.html', {'error_messages': error_messages})
        else:

            user = User.objects.create_user(
                username=email,
                email=email,
                password=password
            )

            company = Company.objects.create(
                user=user,
                name=company_name
            )

            auth_login(request, user)

            return redirect('index')

    return render(request, 'job_offers/register.html')

def logout(request):

    auth_logout(request)

    return render(request, 'job_offers/logout.html')

def delete_account(request):

    try:
        assert request.method == 'POST'

        delete_account_password_confirmation = request.POST.get('password')

        assert delete_account_password_confirmation is not None
        assert request.user.check_password(delete_account_password_confirmation)
    except AssertionError:
        return redirect('index')

    request.user.delete()

    return redirect('account-deleted')

def offers(request):
    return render(request, 'job_offers/offers.html')

def profile(request, company_id):

    try:
        company = Company.objects.filter(id=company_id).first()
        assert company is not None

        return render(request, 'job_offers/profile.html', {"company": company})
    except AssertionError:
        return redirect('index')


def editProfile(request):

    if request.method == 'POST':
        user_company = request.user.company

        user_company.name = request.POST.get('CompanyNameEdit')
        user_company.email = request.POST.get('CompanyContactEmailEdit')
        user_company.phone_number = request.POST.get('CompanyContactPhoneNumberEdit')
        user_company.address = request.POST.get('CompanyAddressEdit')
        user_company.description = request.POST.get('CompanyDescriptionEdit')

        if request.FILES.get("CompanyLogoEdit") is not None:
            user_company.logo.save("", request.FILES['CompanyLogoEdit'].file, False)

        user_company.save()


    return render(request, 'job_offers/edit-profile.html')

def addOffer(request):

    if request.method == 'POST':
        try:
            new_offer = Offer(
                company=request.user.company,
                position=request.POST.get('add-offer__profession'),

                salary_min=int(request.POST.get('add-offer-salary__min')),
                salary_max=int(request.POST.get('add-offer-salary__max')),

                city=request.POST.get('add-offer__location'),

                email=request.POST.get('add-offer-contact__mail'),
                phone_number=request.POST.get('add-offer-contact__phone'),

                description=request.POST.get('add-offer__description'),
            )

            try:
                new_offer.work_mode = Offer.WorkModes(request.POST.get('work-mode'))
            except ValueError: pass

            try:
                new_offer.contract_type = Offer.ContractTypes(request.POST.get('contract-type'))
            except ValueError: pass

            try:
                new_offer.work_time = Offer.WorkTimes(request.POST.get('work-time'))
            except ValueError: pass

            new_offer.save()

            offet_tags_ids = request.POST.get('add-offer__tags').split(',')

            for tag_id in offet_tags_ids:
                try:
                    tag = Tag.objects.filter(id=tag_id).first()
                    assert tag is not None

                    new_offer.tags.add(tag)
                except AssertionError: continue

        except: pass
        finally: return redirect('offers')

    context = {}

    tags = Tag.objects.all()
    context["tags"] = tags

    workmodes_objects = Offer.WorkModes.choices
    context["work_modes"] = workmodes_objects

    worktimes_objects = Offer.WorkTimes.choices
    context["work_times"] = worktimes_objects

    contracttypes_objects = Offer.ContractTypes.choices
    context["contract_types"] = contracttypes_objects

    return render(request, 'job_offers/add-offer.html', context)

def editOffer(request):
    context = {}

    tags = Tag.objects.all()
    context["tags"] = tags

    workmodes_objects = Offer.WorkModes.choices
    context["work_modes"] = workmodes_objects

    worktimes_objects = Offer.WorkTimes.choices
    context["work_times"] = worktimes_objects

    contracttypes_objects = Offer.ContractTypes.choices
    context["contract_types"] = contracttypes_objects

    return render(request, 'job_offers/edit-offer.html', context)

def account_deleted(request):
    return render(request, 'job_offers/account-deleted.html')

def api__offer_details(request):

    try:
        assert request.method == 'GET'

        offerId = request.GET.get('id')
        assert offerId

        offer = Offer.objects.filter(id=uuid.UUID(offerId)).first()
        assert offer
    except AssertionError:
        return JsonResponse(
            data = {
                "status": "error",
            }
        )

    offer.visit_counter += 1
    offer.save()

    return JsonResponse(
        data = {
            "status": "success",
            "data": offer.json()
        }
    )

def api__tags(request):

    try:
        assert request.method == 'GET'

        tags = Tag.objects.all()
    except AssertionError:
        return JsonResponse(
            data = {
                "status": "error",
                "data": []
            }
        )

    return JsonResponse(
        data = {
            "status": "success",
            "data": [
                tag.json() for tag in tags
            ]
        }
    )
