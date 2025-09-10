# Django imports
from django.urls import path

# Module imports
from plane.orchestra.views import WorkspaceManagementWebhookEndpoint

urlpatterns = [
    path(
        "webhooks/workspace-management/",
        WorkspaceManagementWebhookEndpoint.as_view(),
        name="webhooks",
    ),
]
