from rest_framework import status
from rest_framework.test import (APITestCase)
from users.models import User
from households.models import (Household, HouseholdMember)

# =========================
# HOUSEHOLD PERMISSIONS
# =========================
#
# Verify household access
# permissions and owner rules.
#


class HouseholdPermissionTests(
    APITestCase,
):
    def test_non_member_cannot_access_household(
        self,
    ):
        # USERS
        owner = User.objects.create_user(
            username="owner",
            email="owner@test.com",
            password="Test1234!",
        )

        stranger = User.objects.create_user(
            username="stranger",
            email="stranger@test.com",
            password="Test1234!",
        )

        # HOUSEHOLD
        household = Household.objects.create(
            name="Test Household",
            owner=owner,
        )

        # MEMBER
        HouseholdMember.objects.create(
            user=owner,
            household=household,
            role="owner",
        )

        # LOGIN AS STRANGER
        self.client.force_authenticate(
            user=stranger,
        )

        # REQUEST
        response = self.client.get(
            f"/api/households/{household.id}/",
        )

        # EXPECT FORBIDDEN
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
        )
