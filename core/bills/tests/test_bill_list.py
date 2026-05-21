from rest_framework import status
from rest_framework.test import (APITestCase)
from users.models import User
from households.models import (Household, HouseholdMember)
from bills.models import Bill

# =========================
# BILL LIST TESTS
# =========================
#
# Goal: Verify household members can access household bills.


class BillListTests(APITestCase):
    def test_household_member_can_view_bills(self):
        # USER
        user = User.objects.create_user(
            username="ashok",
            email="ashok@test.com",
            password="Test1234!",
        )

        # HOUSEHOLD
        household = Household.objects.create(name="Test Household", owner=user)

        # MEMBERSHIP
        HouseholdMember.objects.create(
            user=user, household=household, role="owner")

        # BILL
        Bill.objects.create(
            household=household,
            title="Electric Bill",
            amount=120,
            created_by_user=user,
        )

        # LOGIN
        self.client.force_authenticate(user=user)

        # REQUEST
        response = self.client.get(f"/api/bills/?household={household.id}")

        # EXPECT SUCCESS
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # EXPECT 1 BILL
        self.assertEqual(len(response.data), 1)

    def test_non_member_cannot_view_bills(self):
        # OWNER
        owner = User.objects.create_user(
            username="owner",
            email="owner@test.com",
            password="Test1234!",
        )

        # STRANGER
        stranger = User.objects.create_user(
            username="stranger",
            email="stranger@test.com",
            password="Test1234!",
        )

        # HOUSEHOLD
        household = Household.objects.create(
            name="Private Household",
            owner=owner,
        )

        # MEMBERSHIP
        HouseholdMember.objects.create(
            user=owner,
            household=household,
            role="owner",
        )

        # BILL
        Bill.objects.create(
            household=household,
            title="Electric Bill",
            amount=120,
            created_by_user=owner,
        )

        # LOGIN AS STRANGER
        self.client.force_authenticate(
            user=stranger,
        )

        # REQUEST
        response = self.client.get(
            f"/api/bills/?household={household.id}",
        )

        # EXPECT FORBIDDEN
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
        )
