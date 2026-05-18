from django.shortcuts import (
    get_object_or_404,
)

from rest_framework import status
from rest_framework.parsers import (
    MultiPartParser,
)
from rest_framework.permissions import (
    IsAuthenticated,
)
from rest_framework.response import (
    Response,
)
from rest_framework.views import (
    APIView,
)

from bills.models import Bill

from bills.serializers.bill_serializer import (
    BillSerializer,
)

from common.permissions import (
    IsHouseholdMember,
)

from households.models import (
    Household,
)

from services.extractor import (
    extract_bill,
)


# =========================
# BILL LIST
# =========================

class BillListView(APIView):
    permission_classes = [
        IsAuthenticated,
        IsHouseholdMember,
    ]

    def get(self, request):
        household_id = (
            request.query_params.get(
                "household"
            )
        )

        if not household_id:
            return Response(
                {
                    "error":
                        "household parameter is required"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        bills = Bill.objects.filter(
            household_id=household_id,
            household__householdmember__user=request.user,
        )

        serializer = BillSerializer(
            bills,
            many=True,
        )

        return Response(
            serializer.data,
        )

    def post(self, request):
        household_id = (
            request.data.get(
                "household"
            )
        )

        file = request.FILES.get(
            "file"
        )

        serializer = BillSerializer(
            data=request.data,
        )

        serializer.is_valid(
            raise_exception=True,
        )

        household = get_object_or_404(
            Household,
            pk=household_id,
        )

        serializer.save(
            household=household,
            created_by_user=request.user,
            file=file,
        )

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )


# =========================
# BILL DETAIL
# =========================

class BillDetailView(APIView):
    permission_classes = [
        IsAuthenticated,
    ]

    def get_object(
        self,
        pk,
        user,
    ):
        return get_object_or_404(
            Bill,
            pk=pk,
            household__householdmember__user=user,
        )

    def get(self, request, pk):
        bill = self.get_object(
            pk,
            request.user,
        )

        serializer = BillSerializer(
            bill,
        )

        return Response(
            serializer.data,
        )

    def put(self, request, pk):
        bill = self.get_object(
            pk,
            request.user,
        )

        serializer = BillSerializer(
            bill,
            data=request.data,
        )

        serializer.is_valid(
            raise_exception=True,
        )

        serializer.save()

        return Response(
            serializer.data,
        )

    def patch(self, request, pk):
        bill = self.get_object(
            pk,
            request.user,
        )

        serializer = BillSerializer(
            bill,
            data=request.data,
            partial=True,
        )

        serializer.is_valid(
            raise_exception=True,
        )

        serializer.save()

        return Response(
            serializer.data,
        )

    def delete(self, request, pk):
        bill = self.get_object(
            pk,
            request.user,
        )

        bill.delete()

        return Response(
            status=status.HTTP_204_NO_CONTENT,
        )


# =========================
# EXTRACT BILL
# =========================

class ExtractBillView(APIView):
    permission_classes = [
        IsAuthenticated,
    ]

    parser_classes = [
        MultiPartParser,
    ]

    def post(self, request):
        file = request.FILES.get(
            "file"
        )

        if not file:
            return Response(
                {
                    "error":
                        "No file uploaded"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            result = extract_bill(file)

            return Response(
                result,
                status=status.HTTP_200_OK,
            )

        except Exception as error:
            print(
                "ERROR:",
                str(error),
            )

            return Response(
                {
                    "error": str(error)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
