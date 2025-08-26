# Python imports

# Django imports

# Third party imports
from rest_framework.exceptions import ValidationError

# Module imports
from plane.orchestra.serializers.webhook import UserManagementEvent

def _as_event(value: str) -> UserManagementEvent:
    try:
        return UserManagementEvent(value)
    except ValueError:
        raise ValidationError({"event_source": "Unknown event_source value."})