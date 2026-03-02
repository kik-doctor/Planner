from django.urls import path

from planner.app.views import TimezoneEndpoint

urlpatterns = [
    # timezone endpoint
    path("timezones/", TimezoneEndpoint.as_view(), name="timezone-list")
]
