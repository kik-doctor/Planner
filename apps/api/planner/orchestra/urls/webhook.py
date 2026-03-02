# Django imports
from django.urls import path

# Module imports
from planner.orchestra.views import WorkspaceManagementWebhookEndpoint
from planner.orchestra.views.webhook.workspace_plan import WorkspacePlanWebhookEndpoint

urlpatterns = [
    path(
        "webhooks/workspace-management/",
        WorkspaceManagementWebhookEndpoint.as_view(),
        name="webhooks",
    ),
    path(
        "webhooks/workspace-plan/",
        WorkspacePlanWebhookEndpoint.as_view(),
    )
]
