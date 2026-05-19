from rest_framework import status

from rest_framework.test import (
    APITestCase,
)

from users.models import User


class RegisterTests(
    APITestCase,
):
    def test_user_can_register(
        self,
    ):
        data = {
            "username": "ashok",
            "email": "ashok@test.com",
            "password": "Test1234!",
        }

        response = self.client.post(
            "/api/auth/register/",
            data,
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
        )

        self.assertEqual(
            User.objects.count(),
            1,
        )
