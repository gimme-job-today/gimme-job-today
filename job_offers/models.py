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

    email = models.EmailField(
        default="",
        blank=True
    )

    phone_number = models.CharField(
        default="",
        max_length=100,
        blank=True,
    )

    description = models.TextField(
        default="",
        blank=True,
    )

    def company_logo_directory(instance, filename):

        extension = filename.split('.')[-1]

        if extension == filename:
            extension = 'png'

        return f'company_logos/{instance.id}.{extension}'

    logo = models.ImageField(upload_to=company_logo_directory, blank=True)

    @property
    def logo_url_or_default(self):
        if self.logo:
            return self.logo.url
        else:
            return "https://www.w3schools.com/howto/img_avatar.png"

    address = models.CharField(
        max_length=100,
        default="",
        blank=True,
    )

    def save(self, *args, **kwargs):
        try:
            this = Company.objects.get(id=self.id)
            if this.logo != self.logo:
                this.logo.delete(save=False)
        except Company.DoesNotExist:
            pass
        super().save(*args, **kwargs)

    def json(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone_number": self.phone_number,
            "description": self.description,
            "address": self.address,
            "logo": {
                "url": self.logo_url_or_default,
            }
        }

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name = 'Company'
        verbose_name_plural = 'Companies'


class Offer(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    company = models.ForeignKey("Company", on_delete=models.CASCADE, related_name="offers")

    time_created = models.DateTimeField(auto_now_add=True)

    position = models.CharField(
        max_length=100
    )

    city = models.CharField(
        max_length=100
    )

    class WorkModes(models.TextChoices):
        STATIONARY = 'stationary', 'Stacjonarny'
        REMOTE = 'remote', 'Zdalny'
        HYBRID = 'hybrid', 'Hybrydowy'

    work_mode = models.CharField(
        max_length=100,
        choices=WorkModes.choices,
        default=WorkModes.STATIONARY
    )

    class WorkTimes(models.TextChoices):
        FULL = 'full', 'Pełny etat'
        ONE_SECOND = 'one_second', 'Pół etatu'
        THREE_FOURTH = 'three_fourth', '3/4 etatu'
        ONE_FOURTH = 'one_fourth', '1/4 etatu'
        OTHER = 'other', 'Inne'

    work_time = models.CharField(
        max_length=100,
        choices=WorkTimes.choices,
        default=WorkTimes.FULL
    )

    class ContractTypes(models.TextChoices):
        CONTRACT_OF_EMPLOYMENT = 'contract_of_employment', 'Umowa o pracę'
        CONTRACT_OF_MANDATE = 'contract_of_mandate', 'Umowa zlecenie'
        CONTRACT_OF_COMMISSION = 'contract_of_commission', 'Umowa o dzieło'
        BUSINESS_TO_BUSINESS = 'business_to_business', 'B2B'
        OTHER = 'other', 'Inne'

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

    @property
    def tags_ids_comma_separated(self):
        return ",".join([str(tag.id) for tag in self.tags.all()])

    tags = models.ManyToManyField("Tag")

    def json(self):
        return {
            "id": self.id,
            "company": self.company.json(),
            "position": self.position,
            "city": self.city,
            "work_mode": dict(self.WorkModes.choices)[self.work_mode],
            "work_time": dict(self.WorkTimes.choices)[self.work_time],
            "contract_type": dict(self.ContractTypes.choices)[self.contract_type],
            "description": self.description,
            "phone_number": self.phone_number,
            "salary_min": self.salary_min,
            "salary_max": self.salary_max,
            "visit_counter": self.visit_counter,
            "tags": [tag.json() for tag in self.tags.all()],
        }

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

    def json(self):
        return {
            "id": self.id,
            "text": self.text,
            "slug": self.slug,
            "color": self.color,
        }

    def __str__(self):
        return f"{self.text} ({self.slug})"
