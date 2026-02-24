# Python imports
import traceback
import zoneinfo

# Django imports
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.db import IntegrityError
from django.utils import timezone
# Third part imports
from rest_framework import status
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

# Module imports
from planner.utils.core import ReadReplicaControlMixin
from planner.utils.exception_logger import log_exception
from planner.utils.paginator import BasePaginator


class TimezoneMixin:
    """
    This enables timezone conversion according
    to the user set timezone
    """

    def initial(self, request, *args, **kwargs):
        super().initial(request, *args, **kwargs)
        if request.user.is_authenticated:
            timezone.activate(zoneinfo.ZoneInfo(request.user.user_timezone))
        else:
            timezone.deactivate()


class BaseAPIView(TimezoneMixin, ReadReplicaControlMixin, APIView, BasePaginator):
    model = None

    use_read_replica = False

    authentication_classes = []  # disable auth

    permission_classes = [AllowAny]

    def handle_exception(self, exc):
        """
        Handle any exception that occurs, by returning an appropriate response,
        or re-raising the error.
        """
        try:
            response = super().handle_exception(exc)
            return response
        except Exception as e:
            (
                print(e, traceback.format_exc())
                if settings.DEBUG
                else print("Server Error")
            )
            if isinstance(e, IntegrityError):
                return Response(
                    {"error": "The payload is not valid"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if isinstance(e, ValidationError):
                return Response(
                    {"error": "Please provide valid detail"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if isinstance(e, ObjectDoesNotExist):
                return Response(
                    {"error": "The required object does not exist."},
                    status=status.HTTP_404_NOT_FOUND,
                )

            if isinstance(e, KeyError):
                log_exception(e)
                return Response(
                    {"error": "The required key does not exist."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            log_exception(e)
            return Response(
                {"error": "Something went wrong please try again later"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def dispatch(self, request, *args, **kwargs):
        try:
            response = super().dispatch(request, *args, **kwargs)

            if settings.DEBUG:
                from django.db import connection

                print(
                    f"{request.method} -"
                    f" {request.get_full_path()} of Queries: {len(connection.queries)}"
                )

            return response
        except Exception as exc:
            response = self.handle_exception(exc)
            return exc

    @property
    def fields(self):
        fields = [
            field for field in self.request.GET.get("fields", "").split(",") if field
        ]
        return fields if fields else None

    @property
    def expand(self):
        expand = [
            expand for expand in self.request.GET.get("expand", "").split(",") if expand
        ]
        return expand if expand else None


class PlannerWebhookAuthentication(BaseAuthentication):
    def authenticate(self, request):
        incoming_key = request.headers.get("X-Planner-Webhook-Key")
        expected_key = getattr(settings, "PLANNER_WEBHOOK_KEY", None)
        if not expected_key or incoming_key != expected_key:
            raise AuthenticationFailed("Invalid or missing API key")
        return None  # no user context, just passes
