from rest_framework import serializers
from households.models import Household, Invitation, HomeProfile, HouseholdMember


class HouseholdsSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()

    class Meta:
        model = Household
        fields = '__all__'
        read_only_fields = ['owner']

    def get_role(self, obj):
        user = self.context['request'].user

        membership = HouseholdMember.objects.filter(
            household=obj,
            user=user
        ).first()

        return membership.role if membership else None


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

    house_image = serializers.ImageField(required=False)

    house_image_url = serializers.SerializerMethodField()

    class Meta:
        model = HomeProfile
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

    def get_house_image_url(self, obj):
        request = self.context.get("request")

        if obj.house_image:
            if request:
                return request.build_absolute_uri(obj.house_image.url)
            return obj.house_image.url

        return None
