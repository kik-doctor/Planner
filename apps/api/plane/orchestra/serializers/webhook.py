# Python imports
from enum import Enum

# Third party imports
from rest_framework import serializers

# Module imports
from plane.app.permissions import ROLE


# ---- Webhook Event Enum ----
class WorkspaceManagementEvent(str, Enum):
    WORKSPACE_CREATED = "WORKSPACE_CREATED"
    WORKSPACE_DELETED = "WORKSPACE_DELETED"
    WORKSPACE_MEMBER_CREATED = "WORKSPACE_MEMBER_CREATED"
    WORKSPACE_MEMBER_ROLE_UPDATED = "WORKSPACE_MEMBER_ROLE_UPDATED"
    WORKSPACE_MEMBER_DELETED = "WORKSPACE_MEMBER_DELETED"


# Map Main app Role -> Planner ROLE
ROLE_MAPPING = {
    "ADMIN": ROLE.ADMIN.value,
    "MANAGER": ROLE.MEMBER.value,  # Manager in Main app → Member in Planner
    "VIEWER": ROLE.GUEST.value,  # Viewer → Guest
}


# ---- Request Serializers (validate incoming payload) ----
class InvitationDataSerializer(serializers.Serializer):
    slug = serializers.CharField(required=False, allow_blank=True)
    role = serializers.ChoiceField(
        required=False, allow_blank=True, choices=list(ROLE_MAPPING.keys())
    )

    def validate_role(self, value):
        mapped_value = ROLE_MAPPING.get(value)
        if mapped_value is None:
            raise serializers.ValidationError(f"Unsupported role: {value}")
        return mapped_value


class DataSerializer(serializers.Serializer):
    email = serializers.EmailField(required=False)
    slug = serializers.CharField(required=False, allow_blank=True)
    workspace_name = serializers.CharField(required=False, allow_blank=True)
    role = serializers.ChoiceField(
        required=False, allow_blank=True, choices=list(ROLE_MAPPING.keys())
    )
    invitation = InvitationDataSerializer(required=False)

    def validate_role(self, value):
        """Convert incoming Main app role into Planner ROLE enum value"""
        if not value:
            return None
        mapped_value = ROLE_MAPPING.get(value)
        if mapped_value is None:
            raise serializers.ValidationError(f"Unsupported role: {value}")
        return mapped_value


class PlannerWorkspaceEventDataSerializer(serializers.Serializer):
    event = serializers.ChoiceField(
        choices=[event.value for event in WorkspaceManagementEvent]
    )
    data = DataSerializer(required=True)
