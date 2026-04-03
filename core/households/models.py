from django.db import models
from django.conf import settings

class Household(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class HouseholdMember(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    household = models.ForeignKey(Household, on_delete=models.CASCADE)

    ROLE_CHOICES = (
        ('owner', 'Owner'),
        ('member', 'Member'),
    )

    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='member')
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'household')
    
    def __str__(self):
        return f"{self.user} - {self.household} ({self.role})"
