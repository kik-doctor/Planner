# Module imports
from planner.license.models import Instance
from planner.app.serializers import BaseSerializer
from planner.app.serializers import UserAdminLiteSerializer


class InstanceSerializer(BaseSerializer):
    primary_owner_details = UserAdminLiteSerializer(source="primary_owner", read_only=True)

    class Meta:
        model = Instance
        fields = "__all__"
        read_only_fields = ["id", "email", "last_checked_at", "is_setup_done"]
