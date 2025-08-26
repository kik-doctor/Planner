# Django imports
from django.urls import path

# Module imports
from plane.orchestra.views import (
    UserManagementWebhookEndpoint
)

urlpatterns = [
    path("webhooks/user-management/", UserManagementWebhookEndpoint.as_view(), name="webhooks"),
]