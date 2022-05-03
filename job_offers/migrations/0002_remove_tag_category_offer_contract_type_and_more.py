# Generated by Django 4.0.3 on 2022-05-03 14:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('job_offers', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tag',
            name='category',
        ),
        migrations.AddField(
            model_name='offer',
            name='contract_type',
            field=models.CharField(choices=[('contract_of_employment', 'Contract of employment'), ('contract_of_mandate', 'Contract of mandate'), ('contract_of_commission', 'Contract of commission'), ('business_to_business', 'B2B'), ('other', 'Other')], default='other', max_length=100),
        ),
        migrations.AddField(
            model_name='offer',
            name='work_mode',
            field=models.CharField(choices=[('stationary', 'Stationary'), ('remote', 'Remote'), ('hybrid', 'Hybrid')], default='stationary', max_length=100),
        ),
        migrations.AddField(
            model_name='offer',
            name='work_time',
            field=models.CharField(choices=[('full', 'Full'), ('three_fourth', '3/4'), ('one_second', '1/2'), ('one_fourth', '1/4'), ('other', 'Other')], default='full', max_length=100),
        ),
    ]
