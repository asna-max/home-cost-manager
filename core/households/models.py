from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model

User = get_user_model()


class Household(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class HouseholdMember(models.Model):
    ROLE_CHOICES = (
        ('owner', 'Owner'),
        ('member', 'Member'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    household = models.ForeignKey(Household, on_delete=models.CASCADE)

    role = models.CharField(
        max_length=10, choices=ROLE_CHOICES, default='member')
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'household')

    def __str__(self):
        return f"{self.user} - {self.household} ({self.role})"


class Invitation(models.Model):

    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('declined', 'Declined'),
    )

    household = models.ForeignKey(Household, on_delete=models.CASCADE)
    email = models.EmailField()
    invited_by_user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.email} → {self.household} ({self.status})"


class HomeProfile(models.Model):
    PROPERTY_TYPE_CHOICES = (
        ('rent', 'Rent'),
        ('owner', 'Owner'),
    )

    BUILDING_TYPE_CHOICES = (
        ('brick', 'Brick'),
        ('wood', 'Wood'),
        ('concrete', 'Concrete'),
        ('mixed', 'Mixed'),
    )

    HEATING_TYPE_CHOICES = (
        ('gas', 'Gas'),
        ('oil', 'Oil'),
        ('electric', 'Electric'),
        ('heat_pump', 'Heat Pump'),
        ('wood', 'Wood'),
    )

    household = models.OneToOneField(Household, on_delete=models.CASCADE)

    property_type = models.CharField(
        max_length=10, choices=PROPERTY_TYPE_CHOICES)

    house_image = models.ImageField(upload_to='houses/', null=True, blank=True)

    building_type = models.CharField(
        max_length=10, choices=BUILDING_TYPE_CHOICES)

    number_of_rooms = models.IntegerField()

    city = models.CharField(max_length=255)

    year_built = models.IntegerField(null=True, blank=True)

    heating_type = models.CharField(
        max_length=20, choices=HEATING_TYPE_CHOICES)

    heating_installation_year = models.IntegerField(null=True, blank=True)

    floor_heating = models.BooleanField(default=False)

    solar_panels = models.BooleanField(default=False)

    solar_installation_year = models.IntegerField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.household} Profile"
