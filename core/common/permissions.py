from rest_framework.permissions import (
    BasePermission,
)

from households.models import (
    HouseholdMember,
)


# =========================
# BASE HOUSEHOLD PERMISSION
# =========================

class BaseHouseholdPermission(
    BasePermission,
):
    def get_household_id(
        self,
        request,
        view,
    ):
        return (
            view.kwargs.get(
                "household_id"
            )
            or view.kwargs.get("pk")
            or request.data.get(
                "household"
            )
            or request.query_params.get(
                "household"
            )
        )


# =========================
# HOUSEHOLD OWNER
# =========================

class IsHouseholdOwner(
    BaseHouseholdPermission,
):
    message = (
        "Only household owners "
        "can perform this action."
    )

    def has_permission(
        self,
        request,
        view,
    ):
        household_id = (
            self.get_household_id(
                request,
                view,
            )
        )

        if not household_id:
            return False

        return HouseholdMember.objects.filter(
            household_id=household_id,
            user=request.user,
            role="owner",
        ).exists()


# =========================
# HOUSEHOLD MEMBER
# =========================

class IsHouseholdMember(
    BaseHouseholdPermission,
):
    message = (
        "You are not a member "
        "of this household."
    )

    def has_permission(
        self,
        request,
        view,
    ):
        household_id = (
            self.get_household_id(
                request,
                view,
            )
        )

        if not household_id:
            return False

        return HouseholdMember.objects.filter(
            household_id=household_id,
            user=request.user,
        ).exists()
