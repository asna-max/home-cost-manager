from rest_framework import status

from rest_framework.test import (
    APITestCase,
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
