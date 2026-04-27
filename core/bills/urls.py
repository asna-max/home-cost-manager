from django.urls import path
from bills.views.bill_views import BillListView, BillDetailView, ExtractBillView

urlpatterns = [
    path('', BillListView.as_view(), name='bill-list'),
    path('extract/', ExtractBillView.as_view(), name='bill-extract'),
    path('<int:pk>', BillDetailView.as_view(), name='bill-detail'),
]
