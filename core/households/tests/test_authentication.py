from rest_framework import status
from rest_framework.test import (APITestCase)
from users.models import User

# =========================
# HOUSEHOLD AUTHENTICATION
# =========================
#
# Goal:
# Verify authenticated and
# unauthenticated access
# to household endpoints.
#


class HouseholdAuthenticationTests(
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
