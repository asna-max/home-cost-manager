from rest_framework.views import APIView
from rest_framework.response import Response
from bills.models import Bill
from bills.serializers.bill_serializer import BillSerializer


class BillListView(APIView):
    def get(self, request):
        bills = Bill.objects.all()
        serializer = BillSerializer(bills, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BillSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)
