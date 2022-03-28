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

    class Catogories(models.TextChoices):
        WORK_MODE = 'work-mode', 'Work Mode'
        CONTRACT_TYPE = 'contract-type', 'Contract Type'
        CITY = 'city', 'City'
        OTHER = 'other', 'Other'

    category = models.CharField(
        max_length=100,
        choices=Catogories.choices,
        default=Catogories.OTHER
    )

    def __str__(self):

        return f"{self.text} ({self.slug}) [{self.category}]"
