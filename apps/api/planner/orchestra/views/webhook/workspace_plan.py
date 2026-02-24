# Python imports
import logging

# Django imports
from django.shortcuts import get_object_or_404
from rest_framework import status
# Third party imports
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

# Module imports
from planner.db.models import Workspace
from planner.db.models.workspace import WorkspacePlan
from planner.orchestra.serializers.webhook import PlannerWorkspacePlanDataSerializer
from planner.orchestra.views.base import BaseAPIView, PlannerWebhookAuthentication

logger = logging.getLogger(__name__)


# ---- View ----

class WorkspacePlanWebhookEndpoint(BaseAPIView):
    """
    Webhook to handle workspace-plan lifecycle:
    """

    authentication_classes = [PlannerWebhookAuthentication]

    def post(self, request):
        logger.info(f"Workspace Management Webhook Req Data: {request.data}")
        payload = PlannerWorkspacePlanDataSerializer(data=request.data)

        payload.is_valid(raise_exception=True)
        slug = payload.validated_data.get("slug", {})
        plan = payload.validated_data.get("plan", WorkspacePlan.FREE.value)
        if not slug:
            raise ValidationError({"slug": "This field is required."})
        workspace = get_object_or_404(Workspace, slug=slug)
        workspace.plan = plan
        workspace.save(update_fields=["plan"])

        return Response(
            {"success": True, "plan": plan},
            status=status.HTTP_200_OK,
        )
