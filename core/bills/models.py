from django.db import models
from households.models import Household
from django.contrib.auth import get_user_model

User = get_user_model()


class Bill(models.Model):
    BILL_TYPE_CHOICES = (
        ('electricity', 'Electricity'),
        ('water', 'Water'),
        ('heating', 'Heating'),
        ('other', 'Other'),
    )

    household = models.ForeignKey(Household, on_delete=models.CASCADE)
    created_by_user = models.ForeignKey(User, on_delete=models.CASCADE)

    title = models.CharField(max_length=255, blank=True)

    bill_type = models.CharField(max_length=20, choices=BILL_TYPE_CHOICES)

    period_from = models.DateField(null=True, blank=True)
    period_to = models.DateField(null=True, blank=True)

    consumption = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )

    amount = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )

    due_date = models.DateField(null=True, blank=True)

    is_paid = models.BooleanField(default=False)

    notes = models.TextField(blank=True)

    file = models.FileField(upload_to='bills/', null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title or 'Bill'} - {self.amount}"
