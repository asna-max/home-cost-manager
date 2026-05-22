from unittest.mock import patch
from django.core.files.uploadedfile import (SimpleUploadedFile)
from rest_framework import status
from rest_framework.test import (APITestCase)
from users.models import User


# =========================
# BILL EXTRACTION
# =========================
#
# Goal: Verify bill extraction API returns extracted bill data.
#

class ExtractBillTests(APITestCase):
    @patch(
        "bills.views.bill_views.extract_bill"
    )
    def test_extract_bill_success(
        self,
        mock_extract_bill,
    ):
        # MOCK RESPONSE

        mock_extract_bill.return_value = {
            "title": "Electric Bill",
            "amount": 120.50,
            "bill_type": "electricity",
        }

        # USER
        user = User.objects.create_user(
            username="ashok",
            email="ashok@test.com",
            password="Test1234!",
        )

        # LOGIN
        self.client.force_authenticate(
            user=user,
        )

        # FAKE FILE
        file = SimpleUploadedFile(
            "bill.pdf",
            b"fake pdf content",
            content_type="application/pdf",
        )

        # REQUEST

        response = self.client.post(
            "/api/bills/extract/",
            {
                "file": file,
            },
            format="multipart",
        )

        # EXPECT SUCCESS
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        # VERIFY RESPONSE
        self.assertEqual(
            response.data["title"],
            "Electric Bill",
        )

        self.assertEqual(
            response.data["bill_type"],
            "electricity",
        )

        # VERIFY MOCK CALLED
        mock_extract_bill.assert_called_once()
