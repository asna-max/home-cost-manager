from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404

from households.models import Household, HouseholdMember, Invitation
from households.serializers import HouseholdsSerializer, InvitationSerializer


class HouseholdListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        households = Household.objects.filter(
            householdmember__user=request.user)

        serializer = HouseholdsSerializer(households, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = HouseholdsSerializer(data=request.data)

        if serializer.is_valid():
            # Household erstellen
            household = serializer.save(owner=request.user)

            # Owner automatisch als Member eintragen
            HouseholdMember.objects.create(
                user=request.user, household=household, role='owner')

            return Response(HouseholdsSerializer(household).data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class InvitationCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        household_id = request.data.get('household')
        email = request.data.get('email')

        if not household_id or not email:
            return Response(
                {"error": "household and email are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        membership = HouseholdMember.objects.filter(
            household_id=household_id,
            user=request.user
        ).first()

        if not membership:
            return Response({"error": "Not allowed"}, status=status.HTTP_403_FORBIDDEN)

        if membership.role != 'owner':
            return Response({"error": "Only owner can invite"}, status=status.HTTP_403_FORBIDDEN)

        existing = Invitation.objects.filter(
            household_id=household_id,
            email=email,
            status='pending'
        ).exists()

        if existing:
            return Response(
                {"error": "Invitation already exists"},
                status=400
            )

        serializer = InvitationSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(
                invited_by_user=request.user,
                household=membership.household,
                status='pending'
            )
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)


class InvitationAcceptView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        invitation = get_object_or_404(Invitation, pk=pk)

        if invitation.email != request.user.email:
            return Response({"error": "Not allowed"}, status=status.HTTP_403_FORBIDDEN)

        if invitation.status != 'pending':
            return Response({"error": "Already handled"}, status=status.HTTP_400_BAD_REQUEST)

        HouseholdMember.objects.create(
            user=request.user, household=invitation.household, role='member')

        invitation.status = 'accepted'
        invitation.save()

        return Response({"message": "Joined household"})


class InvitationListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        invitations = Invitation.objects.filter(
            email=request.user.email,
            status='pending'
        )

        serializer = InvitationSerializer(invitations, many=True)
        return Response(serializer.data)


class InvitationDeclineView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        invitation = get_object_or_404(Invitation, pk=pk)

        if invitation.status != request.user.email:
            return Response({"error": "Not allowed"}, status=403)

        if invitation.status != 'pendig':
            return Response({"error": "Already handled"}, status=400)

        invitation.status = 'declined'
        invitation.save()

        return Response({"message": "Invitation declined"})
