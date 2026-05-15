from django.urls import path

from .views import (
    RegisterView,
    CustomTokenObtainPairView,
)

urlpatterns = [
    # =========================
    # REGISTER
    # =========================

    path(
        "register/",
        RegisterView.as_view(),
        name="register",
    ),

    # =========================
    # LOGIN JWT
    # =========================

    path(
        "token/",
        CustomTokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),
]
