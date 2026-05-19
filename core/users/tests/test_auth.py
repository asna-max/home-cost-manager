from rest_framework import status

from rest_framework.test import (
    APITestCase,
)

from users.models import User


# =========================
# REGISTER TESTS
# =========================
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

    def test_duplicate_email_fails(
        self,
    ):
        # EXISTING USER
        User.objects.create_user(
            username="ashok",
            email="ashok@test.com",
            password="Test1234!",
        )

        # DUPLICATE EMAIL
        data = {
            "username": "ashok2",
            "email": "ashok@test.com",
            "password": "Test1234!",
        }

        response = self.client.post(
            "/api/auth/register/",
            data,
        )

        # EXPECT 400
        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

        # EMAIL ERROR EXISTS
        self.assertIn(
            "email",
            response.data,
        )

        # STILL ONLY 1 USER
        self.assertEqual(
            User.objects.count(),
            1,
        )


# =========================
# LOGIN TESTS
# =========================
class LoginTests(
    APITestCase,
):
    def setUp(self):
        self.user = (
            User.objects.create_user(
                username="ashok",
                email="ashok@test.com",
                password="Test1234!",
            )
        )

    def test_user_can_login(
        self,
    ):
        data = {
            "username": "ashok",
            "password": "Test1234!",
        }

        response = self.client.post(
            "/api/auth/token/",
            data,
        )

        # SUCCESS
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        # TOKENS EXIST
        self.assertIn(
            "access",
            response.data,
        )

        self.assertIn(
            "refresh",
            response.data,
        )

    def test_invalid_password_fails(
        self,
    ):
        data = {
            "username": "ashok",
            "password": "WrongPassword",
        }

        response = self.client.post(
            "/api/auth/token/",
            data,
        )

        # EXPECT 401
        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
        )
