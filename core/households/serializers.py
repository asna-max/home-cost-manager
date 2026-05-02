from rest_framework import serializers
from households.models import Household, Invitation, HomeProfile


class HouseholdsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Household
        fields = '__all__'
        read_only_fields = ['owner']


class InvitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invitation
        fields = '__all__'
        read_only_fields = ['invited_by_user', 'status']


class HomeProfileSerializer(serializers.ModelSerializer):
    household_name = serializers.CharField(
        source="household.name",
        read_only=True
    )

    class Meta:
        model = HomeProfile
        exclude = ['created_at', 'updated_at']
