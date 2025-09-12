# Python imports
import hashlib
import json

# Third party imports
from rest_framework.exceptions import ValidationError

# Module imports
from plane.orchestra.serializers.webhook import WorkspaceManagementEvent


# Django imports


def _as_event(value: str) -> WorkspaceManagementEvent:
    try:
        return WorkspaceManagementEvent(value)
    except ValueError:
        raise ValidationError({"event_source": "Unknown event_source value."})


def get_idempotency_key(data: dict) -> str:
    json_bytes = json.dumps(data, sort_keys=True).encode("utf-8")
    return hashlib.sha256(json_bytes).hexdigest()
