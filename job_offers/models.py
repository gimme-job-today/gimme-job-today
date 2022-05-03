import uuid

from django.contrib.auth.models import User
from django.core.validators import RegexValidator, MinValueValidator, MaxValueValidator
from django.db import models

# Create your models here.

class Company(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='company')

    name = models.CharField(
        max_length=100
    )

    email = models.EmailField()

    phone_number = models.CharField(
        max_length=100,
        blank=True, null=True
    )

    description = models.TextField()

    def company_logo_directory(instance, filename):
        return f'company_logos/{instance.id}/{filename}'

    logo = models.ImageField(upload_to=company_logo_directory, blank=True)

    address = models.CharField(
        max_length=100
    )

    def __str__(self):
        return f"{self.name}"


class Offer(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    company = models.ForeignKey("Company", on_delete=models.CASCADE)

    position = models.CharField(
        max_length=100
    )

    city = models.CharField(
        max_length=100
    )

    class WorkModes(models.TextChoices):
        STATIONARY = 'stationary', 'Stationary'
        REMOTE = 'remote', 'Remote'
        HYBRID = 'hybrid', 'Hybrid'

    work_mode = models.CharField(
        max_length=100,
        choices=WorkModes.choices,
        default=WorkModes.STATIONARY
    )

    class WorkTimes(models.TextChoices):
        FULL = 'full', 'Full'
        THREE_FOURTH = 'three_fourth', '3/4'
        ONE_SECOND = 'one_second', '1/2'
        ONE_FOURTH = 'one_fourth', '1/4'
        OTHER = 'other', 'Other'

    work_time = models.CharField(
        max_length=100,
        choices=WorkTimes.choices,
        default=WorkTimes.FULL
    )

    class ContractTypes(models.TextChoices):
        CONTRACT_OF_EMPLOYMENT = 'contract_of_employment', 'Contract of employment'
        CONTRACT_OF_MANDATE = 'contract_of_mandate', 'Contract of mandate'
        CONTRACT_OF_COMMISSION = 'contract_of_commission', 'Contract of commission'
        BUSINESS_TO_BUSINESS = 'business_to_business', 'B2B'
        OTHER = 'other', 'Other'

    contract_type = models.CharField(
        max_length=100,
        choices=ContractTypes.choices,
        default=ContractTypes.OTHER
    )

    description = models.TextField()

    email = models.EmailField()

    phone_number = models.CharField(
        max_length=100,
        blank=True, null=True
    )

    salary_min = models.PositiveIntegerField(
        validators=[
            MinValueValidator(0),
        ]
    )
    salary_max = models.PositiveIntegerField(
        validators=[
            MaxValueValidator(99999),
        ]
    )

    visit_counter = models.PositiveIntegerField(default=0)

    tags = models.ManyToManyField("Tag")

    def __str__(self):
        all_tags = ", ".join([tag.text for tag in self.tags.all()])

        return f"{self.position} in {self.company.name} in {self.city}: {all_tags}"


class Tag(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    text = models.CharField(
        max_length=100
    )

    slug = models.SlugField(
        max_length=100
    )

    color = models.CharField(
        max_length=7,
        validators=[
            RegexValidator(regex=r"^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$")
        ]
    )

    def __str__(self):
        return f"{self.text} ({self.slug})"
