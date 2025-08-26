# Python imports
from enum import Enum

# Third party imports
from rest_framework import serializers

# Module imports
from plane.app.permissions import ROLE


# ---- Webhook Event Enum ----
class UserManagementEvent(str, Enum):
    ADMIN_USER_CREATED = "ADMIN_USER_CREATED"
    USER_CREATED = "USER_CREATED"
    USER_ROLE_UPDATED = "USER_ROLE_UPDATED"
    USER_DELETED = "USER_DELETED"

# Map Main app Role -> Planner ROLE
ROLE_MAPPING = {
    "ADMIN": ROLE.ADMIN.value,
    "MANAGER": ROLE.MEMBER.value,        # Manager in Main app → Member in Planner
    "VIEWER": ROLE.GUEST.value,          # Viewer → Guest
    "PLANNER_VIEWER": ROLE.GUEST.value,  # collapse to Guest
    "STUDIO_VIEWER": None,   # collapse to Guest
}

# ---- Request Serializers (validate incoming payload) ----
class InvitationDataSerializer(serializers.Serializer):
    slug = serializers.CharField(required=False, allow_blank=True)
    invitee_role = serializers.ChoiceField(required=False, allow_blank=True, choices=list(ROLE_MAPPING.keys()))

    def validate_invitee_role(self, value):
        mapped_value = ROLE_MAPPING.get(value)
        if mapped_value is None:
            raise serializers.ValidationError(f"Unsupported invitee_role: {value}")
        return mapped_value

class DataSerializer(serializers.Serializer):
    email = serializers.EmailField()
    slug = serializers.CharField(required=False, allow_blank=True)
    workspace_name = serializers.CharField(required=False, allow_blank=True)
    role = serializers.ChoiceField(required=False, allow_blank=True, choices=list(ROLE_MAPPING.keys()))
    invitations = InvitationDataSerializer(many=True, required=False, default=list)

    def validate_role(self, value):
        """Convert incoming Main app role into Planner ROLE enum value"""
        if not value:
            return None
        mapped_value = ROLE_MAPPING.get(value)
        if mapped_value is None:
            raise serializers.ValidationError(f"Unsupported role: {value}")
        return mapped_value

class PlannerUserEventDataSerializer(serializers.Serializer):
    event = serializers.ChoiceField(choices=[event.value for event in UserManagementEvent])
    data = DataSerializer(required=True)


