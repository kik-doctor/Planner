from django.urls import path

from planner.api.views import UserEndpoint

urlpatterns = [
    path(
        "users/me/",
        UserEndpoint.as_view(http_method_names=["get"]),
        name="users",
    ),
]
