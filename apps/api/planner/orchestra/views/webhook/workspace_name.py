# Python imports
import logging

# Django imports
from django.shortcuts import get_object_or_404
# Third party imports
from rest_framework import status
from rest_framework.response import Response

# Module imports
from planner.db.models import Workspace
from planner.orchestra.serializers.webhook import WorkspaceNameDataSerializer
from planner.orchestra.views.base import BaseAPIView, WebhookAuthentication

logger = logging.getLogger(__name__)


class WorkspaceNameWebhookEndpoint(BaseAPIView):
    """
    Webhook to handle workspace-name lifecycle:
    """

    authentication_classes = [WebhookAuthentication]

    def post(self, request):
        logger.info(f"Workspace Name Webhook Req Data: {request.data}")
        payload = WorkspaceNameDataSerializer(data=request.data)

        payload.is_valid(raise_exception=True)
        slug = payload.validated_data.get("slug", "")
        name = payload.validated_data.get("name", "")
        workspace = get_object_or_404(Workspace, slug=slug)
        workspace.name = name
        workspace.save(update_fields=["name"])

        return Response(
            {"success": True, "name": name},
            status=status.HTTP_200_OK,
        )
