# Third party imports
import jwt
# Django imports
from django.conf import settings
# Third party imports
from rest_framework import serializers

# Module import
from plane.db.models import Account, Profile, User, Workspace, WorkspaceMemberInvite
from plane.utils.url import contains_url
from .base import BaseSerializer


class UserSerializer(BaseSerializer):
    def validate_first_name(self, value):
        if contains_url(value):
            raise serializers.ValidationError("First name cannot contain a URL.")
        return value

    def validate_last_name(self, value):
        if contains_url(value):
            raise serializers.ValidationError("Last name cannot contain a URL.")
        return value

    class Meta:
        model = User
        # Exclude password field from the serializer
        fields = [field.name for field in User._meta.fields if field.name != "password"]
        # Make all system fields and email read only
        read_only_fields = [
            "id",
            "username",
            "mobile_number",
            "email",
            "token",
            "created_at",
            "updated_at",
            "is_superuser",
            "is_staff",
            "is_managed",
            "last_active",
            "last_login_time",
            "last_logout_time",
            "last_login_ip",
            "last_logout_ip",
            "last_login_uagent",
            "last_location",
            "last_login_medium",
            "created_location",
            "is_bot",
            "is_password_autoset",
            "is_email_verified",
            "is_active",
            "token_updated_at",
        ]

        # If the user has already filled first name or last name then he is onboarded
        def get_is_onboarded(self, obj):
            return bool(obj.first_name) or bool(obj.last_name)


class UserMeSerializer(BaseSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "avatar",
            "cover_image",
            "avatar_url",
            "cover_image_url",
            "date_joined",
            "display_name",
            "email",
            "first_name",
            "last_name",
            "is_active",
            "is_bot",
            "is_email_verified",
            "user_timezone",
            "username",
            "is_password_autoset",
            "is_email_verified",
            "last_login_medium",
        ]
        read_only_fields = fields

    # Modify first, last name using cookie data
    def to_representation(self, instance):
        data = super().to_representation(instance)
        request = self.context.get("request")
        payload = None
        if request:
            token = request.COOKIES.get("owsauth")
            if token:
                try:
                    payload = jwt.decode(
                        token,
                        settings.SECRET_KEY,
                        algorithms=["HS256"],
                    )
                except jwt.PyJWTError:
                    payload = None
        if payload:
            data["first_name"] = payload.get("firstName", data["first_name"])
            data["last_name"] = payload.get("lastName", data["last_name"])
        return data


class UserMeSettingsSerializer(BaseSerializer):
    workspace = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "email", "workspace"]
        read_only_fields = fields

    def get_workspace(self, obj):
        # Add active workspace slug to user settings data as a last visited workspace id
        request = self.context.get("request")
        payload = None
        if request:
            token = request.COOKIES.get("owsauth")
            if token:
                try:
                    payload = jwt.decode(
                        token,
                        settings.SECRET_KEY,
                        algorithms=["HS256"],
                    )
                except jwt.PyJWTError:
                    payload = None

        workspace_invites = WorkspaceMemberInvite.objects.filter(
            email=obj.email
        ).count()

        if (
                payload is not None
                and Workspace.objects.filter(
            slug=payload['workspaceSlug'],
            workspace_member__member=obj.id,
            workspace_member__is_active=True,
        ).exists()
        ):
            workspace_slug = payload['workspaceSlug']
            workspace = Workspace.objects.filter(
                slug=workspace_slug,
                workspace_member__member=obj.id,
                workspace_member__is_active=True,
            ).first()
            logo_asset_url = workspace.logo_asset.asset_url if workspace.logo_asset is not None else ""
            return {
                "last_workspace_id": workspace.id,
                "last_workspace_slug": (
                    workspace.slug if workspace is not None else ""
                ),
                "last_workspace_name": (
                    workspace.name if workspace is not None else ""
                ),
                "last_workspace_logo": logo_asset_url,
                "fallback_workspace_id": workspace.id,
                "fallback_workspace_slug": (
                    workspace.slug if workspace is not None else ""
                ),
                "invites": workspace_invites,
            }
        else:
            fallback_workspace = (
                Workspace.objects.filter(workspace_member__member_id=obj.id, workspace_member__is_active=True)
                .order_by("created_at")
                .first()
            )
            return {
                "last_workspace_id": None,
                "last_workspace_slug": None,
                "fallback_workspace_id": (fallback_workspace.id if fallback_workspace is not None else None),
                "fallback_workspace_slug": (fallback_workspace.slug if fallback_workspace is not None else None),
                "invites": workspace_invites,
            }


class UserLiteSerializer(BaseSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "avatar",
            "avatar_url",
            "is_bot",
            "display_name",
        ]
        read_only_fields = ["id", "is_bot"]


class UserAdminLiteSerializer(BaseSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "avatar",
            "avatar_url",
            "is_bot",
            "display_name",
            "email",
            "last_login_medium",
        ]
        read_only_fields = ["id", "is_bot"]


class ChangePasswordSerializer(serializers.Serializer):
    model = User

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, min_length=8)
    confirm_password = serializers.CharField(required=True, min_length=8)

    def validate(self, data):
        if data.get("old_password") == data.get("new_password"):
            raise serializers.ValidationError({"error": "New password cannot be same as old password."})

        if data.get("new_password") != data.get("confirm_password"):
            raise serializers.ValidationError({"error": "Confirm password should be same as the new password."})

        return data


class ResetPasswordSerializer(serializers.Serializer):
    """
    Serializer for password change endpoint.
    """

    new_password = serializers.CharField(required=True, min_length=8)


class ProfileSerializer(BaseSerializer):
    class Meta:
        model = Profile
        fields = "__all__"
        read_only_fields = ["user"]


class AccountSerializer(BaseSerializer):
    class Meta:
        model = Account
        fields = "__all__"
        read_only_fields = ["user"]
