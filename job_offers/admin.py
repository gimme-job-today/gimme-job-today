from django.contrib import admin

from .models import Company, Offer, Tag

# Register your models here.


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone_number', 'description', 'address')


@admin.register(Offer)
class OfferAdmin(admin.ModelAdmin):
    list_display = ('company', 'position', 'city', 'description', 'email', 'phone_number', 'salary_min', 'salary_max')


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('text',"slug", "color", "category")
