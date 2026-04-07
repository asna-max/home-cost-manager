from django.urls import path
from bills.views.bill_views import BillListView

urlpatterns = [
    path('', BillListView.as_view(), name='bill-list'),
]
