from django.urls import path
from .views import HouseholdListCreateView, InvitationCreateView, InvitationAcceptView

urlpatterns = [
    path('', HouseholdListCreateView.as_view()),
    path('invite/', InvitationCreateView.as_view()),
    path('invite/<int:pk>/accept/', InvitationAcceptView.as_view()),

]
