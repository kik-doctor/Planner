from django.urls import path

from planner.app.views import ExportIssuesEndpoint


urlpatterns = [
    path(
        "workspaces/<str:slug>/export-issues/",
        ExportIssuesEndpoint.as_view(),
        name="export-issues",
    ),
]
