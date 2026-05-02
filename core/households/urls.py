from django.urls import path
from .views import HouseholdListCreateView, InvitationCreateView, InvitationAcceptView, InvitationListView, InvitationDeclineView, HomeProfileView, HouseholdUpdateView

urlpatterns = [
    path('', HouseholdListCreateView.as_view()),
    path('<int:pk>/', HouseholdUpdateView.as_view()),

    path('invite/', InvitationCreateView.as_view()),
    path('invite/<int:pk>/accept/', InvitationAcceptView.as_view()),
    path('invite/list/', InvitationListView.as_view()),
    path('invite/<int:pk>/decline/', InvitationDeclineView.as_view()),
    path('homes/<int:household_id>/', HomeProfileView.as_view()),





]
