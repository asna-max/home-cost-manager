from rest_framework import status
from rest_framework.test import (APITestCase)
from users.models import User
from households.models import (Household, HouseholdMember)
from bills.models import Bill
from decimal import Decimal


# =========================
# BILL CREATION
# =========================
#
# Goal: Verify household members can create household bills.
#

class BillCreateTests(
    APITestCase,
):
    def test_member_can_create_bill(
        self,
    ):
        # USER
        user = User.objects.create_user(
            username="ashok",
            email="ashok@test.com",
            password="Test1234!",
        )

        # HOUSEHOLD
        household = Household.objects.create(
            name="Test Household",
            owner=user,
        )

        # MEMBERSHIP
        HouseholdMember.objects.create(
            user=user,
            household=household,
            role="owner",
        )

        # LOGIN
        self.client.force_authenticate(
            user=user,
        )

        # REQUEST DATA
        data = {
            "title": "Electric Bill",
            "bill_type": "electricity",
            "amount": "120.50",
            "household": household.id,
        }

        # REQUEST
        response = self.client.post(
            "/api/bills/",
            data,
        )

        # EXPECT CREATED
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
        )

        # VERIFY DB
        self.assertEqual(
            Bill.objects.count(),
            1,
        )

        bill = Bill.objects.first()

        self.assertEqual(
            bill.title,
            "Electric Bill",
        )

        self.assertEqual(
            bill.bill_type,
            "electricity",
        )

        self.assertEqual(
            bill.amount,
            Decimal("120.50"),
        )

        self.assertEqual(
            bill.household,
            household,
        )

    def test_create_bill_without_bill_type_fails(self):
        # USER
        user = User.objects.create_user(
            username="ashok",
            email="ashok@test.com",
            password="Test1234!",
        )

        # HOUSEHOLD
        household = Household.objects.create(
            name="Test Household",
            owner=user,
        )

        # MEMBERSHIP
        HouseholdMember.objects.create(
            user=user,
            household=household,
            role="owner",
        )

        # LOGIN
        self.client.force_authenticate(
            user=user,
        )

        # INVALID DATA
        data = {
            "title": "Invalid Bill",
            "amount": "120.50",
            "household": household.id,
        }

        # REQUEST
        response = self.client.post(
            "/api/bills/",
            data,
        )

        # EXPECT BAD REQUEST
        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

        # VERIFY VALIDATION ERROR
        self.assertIn(
            "bill_type",
            response.data,
        )

        # VERIFY NOTHING CREATED
        self.assertEqual(
            Bill.objects.count(),
            0,
        )
