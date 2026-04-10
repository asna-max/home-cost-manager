from rest_framework.views import APIView
from rest_framework.response import Response
from bills.models import Bill
from bills.serializers.bill_serializer import BillSerializer
from django.shortcuts import get_object_or_404
from rest_framework import status
from households.models import HouseholdMember


class BillListView(APIView):
    def get(self, request):
        household_id = request.query_params.get('household')

        if not household_id:
            return Response({"error": "household parameter is required"}, status=400)

        bills = Bill.objects.filter(
            household_id=household_id, household__householdmember__user=request.user)

        if not bills.exists():
            return Response({"error": "No access to this household"}, status=403)

        serializer = BillSerializer(bills, many=True)
        return Response(serializer.data)

    def post(self, request):
        household_id = request.query_params.get('household')

        if not HouseholdMember.objects.filter(household_id=household_id, user=request.user).exists():
            return Response({"error": "not allower"}, status=403)

        serializer = BillSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)


class BillDetailView(APIView):
    def get_object(self, pk):
        return get_object_or_404(Bill, pk=pk)

    def get(self, request, pk):
        bill = self.get_object(pk)
        serializer = BillSerializer(bill)
        return Response(serializer.data)

    def put(self, request, pk):
        bill = self.get_object(pk)
        serializer = BillSerializer(bill, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        bill = self.get_object(pk)
        bill.delete()
        return Response(status=204)
