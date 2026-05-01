from rest_framework.views import APIView
from rest_framework.response import Response
from bills.models import Bill
from bills.serializers.bill_serializer import BillSerializer
from django.shortcuts import get_object_or_404
from rest_framework import status
from households.models import HouseholdMember
from rest_framework.permissions import IsAuthenticated

from services.extractor import extract_bill
from rest_framework.parsers import MultiPartParser


class BillListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        household_id = request.query_params.get('household')

        if not household_id:
            return Response({"error": "household parameter is required"}, status=400)

        bills = Bill.objects.filter(
            household_id=household_id, household__householdmember__user=request.user)

        serializer = BillSerializer(bills, many=True)
        return Response(serializer.data)

    def post(self, request):
        household_id = request.data.get('household')

        membership = HouseholdMember.objects.filter(
            household_id=household_id, user=request.user).first()

        if not membership:
            return Response({"error": "not allower"}, status=403)

        file = request.FILES.get("file")

        data = request.data.copy()

        serializer = BillSerializer(data=data)

        if serializer.is_valid():
            serializer.save(household=membership.household,
                            created_by_user=request.user,
                            file=file)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)


class BillDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk, user):
        return get_object_or_404(Bill, pk=pk, household__householdmember__user=user)

    def get(self, request, pk):
        bill = self.get_object(pk, request.user)

        serializer = BillSerializer(bill)
        return Response(serializer.data)

    def put(self, request, pk):
        bill = self.get_object(pk, request.user)

        serializer = BillSerializer(bill, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    def patch(self, request, pk):
        bill = self.get_object(pk, request.user)
        serializer = BillSerializer(bill, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        bill = self.get_object(pk, request.user)
        bill.delete()
        return Response(status=204)


class ExtractBillView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser]

    def post(self, request):
        file = request.FILES.get("file")

        if not file:
            return Response({"error": "No file uploaded "}, status=400)

        print("===== FILE DEBUG =====")
        print("FILES NAME:", file.name)
        print("FILES TYPE:", file.content_type)
        print("FILES SIZE:", file.size)

        try:
            result = extract_bill(file)
            return Response(result, status=200)

        except Exception as e:
            print(" ERROR:", str(e))
            return Response({"error": str(e)}, status=500)
