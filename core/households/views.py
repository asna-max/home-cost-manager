from households.serializers import (
    HomeProfileSerializer,
    HouseholdsSerializer,
    InvitationSerializer,
)
from common.permissions import (
    IsHouseholdMember,
    IsHouseholdOwner,
)
from households.models import (
    HomeProfile,
    Household,
    HouseholdMember,
    Invitation,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import (
    IsAuthenticated,
)
from rest_framework.parsers import (
    FormParser,
    MultiPartParser,
)
from rest_framework import status
from django.shortcuts import get_object_or_404


# =========================
# HOUSEHOLDS
# =========================

class HouseholdListCreateView(APIView):
    permission_classes = [
        IsAuthenticated,
    ]

    def get(self, request):
        households = Household.objects.filter(
            householdmember__user=request.user,
        )

        serializer = HouseholdsSerializer(
            households,
            many=True,
            context={"request": request},
        )

        return Response(serializer.data)

    def post(self, request):
        serializer = HouseholdsSerializer(
            data=request.data,
            context={"request": request},
        )

        serializer.is_valid(
            raise_exception=True,
        )

        household = serializer.save(
            owner=request.user,
        )

        HouseholdMember.objects.create(
            user=request.user,
            household=household,
            role="owner",
        )

        return Response(
            HouseholdsSerializer(
                household,
                context={"request": request},
            ).data,
            status=status.HTTP_201_CREATED,
        )


# =========================
# INVITATIONS
# =========================

class InvitationCreateView(APIView):
    permission_classes = [
        IsAuthenticated,
        IsHouseholdOwner,
    ]

    def post(self, request, household_id):
        email = request.data.get("email")

        if not email:
            return Response(
                {
                    "error": "Email is required",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        existing = Invitation.objects.filter(
            household_id=household_id,
            email=email,
            status="pending",
        ).exists()

        if existing:
            return Response(
                {
                    "error": "Invitation already exists",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = InvitationSerializer(
            data=request.data,
            context={"request": request},
        )

        serializer.is_valid(
            raise_exception=True,
        )

        household = get_object_or_404(
            Household,
            pk=household_id,
        )

        serializer.save(
            invited_by_user=request.user,
            household=household,
            status="pending",
        )

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )


class InvitationAcceptView(APIView):
    permission_classes = [
        IsAuthenticated,
    ]

    def post(self, request, pk):
        invitation = get_object_or_404(
            Invitation,
            pk=pk,
        )

        if invitation.email != request.user.email:
            return Response(
                {
                    "error": "Not allowed",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        if invitation.status != "pending":
            return Response(
                {
                    "error": "Invitation already handled",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        HouseholdMember.objects.create(
            user=request.user,
            household=invitation.household,
            role="member",
        )

        invitation.status = "accepted"
        invitation.save()

        return Response(
            {
                "message": "Joined household",
            },
            status=status.HTTP_200_OK,
        )


class InvitationListView(APIView):
    permission_classes = [
        IsAuthenticated,
    ]

    def get(self, request):
        invitations = Invitation.objects.filter(
            email=request.user.email,
            status="pending",
        )

        serializer = InvitationSerializer(
            invitations,
            many=True,
            context={"request": request},
        )

        return Response(serializer.data)


class InvitationDeclineView(APIView):
    permission_classes = [
        IsAuthenticated,
    ]

    def post(self, request, pk):
        invitation = get_object_or_404(
            Invitation,
            pk=pk,
        )

        if invitation.email != request.user.email:
            return Response(
                {
                    "error": "Not allowed",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        if invitation.status != "pending":
            return Response(
                {
                    "error": "Invitation already handled",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        invitation.status = "declined"
        invitation.save()

        return Response(
            {
                "message": "Invitation declined",
            },
            status=status.HTTP_200_OK,
        )


# =========================
# HOME PROFILE
# =========================

class HomeProfileView(APIView):
    permission_classes = [
        IsAuthenticated,
        IsHouseholdMember,
    ]

    parser_classes = [
        MultiPartParser,
        FormParser,
    ]

    def get_profile(self, household_id):
        profile, _ = HomeProfile.objects.get_or_create(
            household_id=household_id,
            defaults={
                "property_type": "rent",
                "building_type": "brick",
                "number_of_rooms": 1,
                "city": "",
                "heating_type": "gas",
            },
        )

        return profile

    def get(self, request, household_id):
        profile = self.get_profile(
            household_id,
        )

        serializer = HomeProfileSerializer(
            profile,
            context={"request": request},
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

    def put(self, request, household_id):
        membership = HouseholdMember.objects.filter(
            household_id=household_id,
            user=request.user,
            role="owner",
        ).exists()

        if not membership:
            return Response(
                {
                    "error": "Only owner can edit",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        profile = self.get_profile(
            household_id,
        )

        serializer = HomeProfileSerializer(
            profile,
            data=request.data,
            partial=True,
            context={"request": request},
        )

        serializer.is_valid(
            raise_exception=True,
        )

        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )


# =========================
# HOUSEHOLD UPDATE
# =========================

class HouseholdUpdateView(APIView):
    permission_classes = [
        IsAuthenticated,
        IsHouseholdOwner,
    ]

    def get_household(self, pk):
        return get_object_or_404(
            Household,
            pk=pk,
        )

    def patch(self, request, pk):
        household = self.get_household(pk)

        name = request.data.get("name")

        if not name:
            return Response(
                {
                    "error": "Name is required",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        household.name = name
        household.save()

        return Response(
            {
                "id": household.id,
                "name": household.name,
            },
            status=status.HTTP_200_OK,
        )

    def put(self, request, pk):
        return self.patch(
            request,
            pk,
        )

    def delete(self, request, pk):
        household = self.get_household(pk)

        household.delete()

        return Response(
            {
                "message": "Household deleted",
            },
            status=status.HTTP_204_NO_CONTENT,
        )
