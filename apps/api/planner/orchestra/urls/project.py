# Django imports
from django.urls import path

# Module imports
from planner.orchestra.views import ProjectAPIEndpoint

urlpatterns = [
    path("projects/", ProjectAPIEndpoint.as_view(), name="projects")
]
