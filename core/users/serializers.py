from rest_framework import serializers

from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
)

from .models import User


# =========================
# REGISTER
# =========================

class RegisterSerializer(
    serializers.ModelSerializer
):
    class Meta:
        model = User

        fields = (
            "username",
            "email",
            "password",
        )

        extra_kwargs = {
            "password": {
                "write_only": True
            }
        }

    def create(
        self,
        validated_data,
    ):
        return User.objects.create_user(
            username=validated_data[
                "username"
            ],

            email=validated_data[
                "email"
            ],

            password=validated_data[
                "password"
            ],
        )


# =========================
# CUSTOM JWT
# =========================

class CustomTokenObtainPairSerializer(
    TokenObtainPairSerializer
):
    @classmethod
    def get_token(
        cls,
        user,
    ):
        token = super().get_token(
            user
        )

        # CUSTOM CLAIMS
        token["username"] = (
            user.username
        )

        token["email"] = (
            user.email
        )

        return token
