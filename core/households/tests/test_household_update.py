from rest_framework import status

from rest_framework.test import (
    APITestCase,
)

from users.models import User

from households.models import (
    Household,
    HouseholdMember,
)


# =========================
# HOUSEHOLD UPDATE
# =========================

class HouseholdUpdateTests(
    APITestCase,
):
    def test_owner_can_update_household(
        self,
    ):
        # OWNER
        owner = User.objects.create_user(
            username="owner",
            email="owner@test.com",
            password="Test1234!",
        )

        # HOUSEHOLD
        household = Household.objects.create(
            name="Old Name",
            owner=owner,
        )

        # MEMBERSHIP
        HouseholdMember.objects.create(
            user=owner,
            household=household,
            role="owner",
        )

        # LOGIN
        self.client.force_authenticate(
            user=owner,
        )

        # UPDATE
        response = self.client.patch(
            f"/api/households/{household.id}/",
            {
                "name": "New Name",
            },
        )

        # EXPECT SUCCESS
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        # REFRESH DATABASE
        household.refresh_from_db()

        # CHECK UPDATED
        self.assertEqual(
            household.name,
            "New Name",
        )
