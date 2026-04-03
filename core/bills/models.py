from django.db import models
from households.models import Household


class Bill(models.Model):
    BILL_TYPE_CHOICES = (
        ('electricity', 'Electricity'),
        ('water', 'Water'),
        ('heating', 'Heating'),
        ('other', 'Other'),
    )

    household = models.ForeignKey(Household, on_delete=models.CASCADE)

    title = models.CharField(max_length=255)
    bill_type = models.CharField(max_length=20, choices=BILL_TYPE_CHOICES)

    amount = models.DecimalField(max_digits=10, decimal_places=2)

    period_from = models.DateField()
    period_to = models.DateField()

    due_date = models.DateField()

    is_paid = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.amount}"


# Create your models here.
