from rest_framework import status

from rest_framework.test import (
    APITestCase,
)
from users.models import User

from households.models import (
    Household,
    HouseholdMember,
)


class HouseholdPermissionTests(
    APITestCase,
):
    def test_unauthenticated_user_cannot_access_households(
        self,
    ):
        response = self.client.get(
            "/api/households/",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
        )

    def test_authenticated_user_can_access_households(
        self,
    ):
        # CREATE USER
        user = User.objects.create_user(
            username="ashok",
            email="ashok@test.com",
            password="Test1234!",
        )

        # LOGIN TEST USER
        self.client.force_authenticate(
            user=user,
        )

        # REQUEST
        response = self.client.get(
            "/api/households/",
        )

        # EXPECT NOT 401
        self.assertNotEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
        )

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
