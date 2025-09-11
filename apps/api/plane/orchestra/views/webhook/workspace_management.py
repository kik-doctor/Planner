# Python imports
from __future__ import annotations

import logging
import uuid

# Django imports
from django.db import transaction
from django.db.models import Count, Q
from django.shortcuts import get_object_or_404
from django.utils import timezone
# Third party imports
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from plane.app.permissions import ROLE
# Module imports
from plane.app.serializers import (
    ProfileSerializer,
    WorkSpaceMemberSerializer,
    WorkSpaceSerializer,
)
from plane.bgtasks.workspace_seed_task import workspace_seed
from plane.db.models import (
    Profile,
    Project,
    ProjectMember,
    User,
    Workspace,
    WorkspaceMember,
)
from plane.orchestra.serializers.webhook import (
    PlannerWorkspaceEventDataSerializer,
    WorkspaceManagementEvent,
)
from plane.orchestra.utils.webhook import _as_event
from plane.orchestra.views.base import BaseAPIView, PlannerWebhookAuthentication

logger = logging.getLogger(__name__)


# ---- View ----
class WorkspaceManagementWebhookEndpoint(BaseAPIView):
    """
    Webhook to handle workspace-related lifecycle:
    """

    authentication_classes = [PlannerWebhookAuthentication]

    # POST: WORKSPACE_CREATED / WORKSPACE_MEMBER_CREATED / WORKSPACE_MEMBER_ROLE_UPDATED / WORKSPACE_MEMBER_DELETED
    def post(self, request):
        logger.info(f"Workspace Management Webhook Req Data: {request.data}")
        payload = PlannerWorkspaceEventDataSerializer(data=request.data)
        payload.is_valid(raise_exception=True)

        event = _as_event(payload.validated_data["event"])
        if event not in [
            WorkspaceManagementEvent.WORKSPACE_CREATED,
            WorkspaceManagementEvent.WORKSPACE_MEMBER_CREATED,
            WorkspaceManagementEvent.WORKSPACE_MEMBER_ROLE_UPDATED,
            WorkspaceManagementEvent.WORKSPACE_MEMBER_DELETED,
        ]:
            return Response(
                {"error": f"Unsupported event: {event.value}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        data = payload.validated_data.get("data", {})
        email = data.get("email")

        # NOTE: all DB writes happen inside a single transaction
        with transaction.atomic():
            if event in [
                WorkspaceManagementEvent.WORKSPACE_CREATED,
                WorkspaceManagementEvent.WORKSPACE_MEMBER_CREATED
            ]:
                # Create new user if no existing user
                user = User.objects.filter(email=email).first()
                if not user:
                    user = User(email=email, username=uuid.uuid4().hex)
                    user.set_password(uuid.uuid4().hex)
                    user.is_password_autoset = True
                    user.is_email_verified = True
                    user.save()
                    logger.info(f"User Created >>>>>>>> {user}")

                    # Patch onboarding profile data
                    profile, _ = Profile.objects.get_or_create(user=user)
                    profile_data = {
                        "is_onboarded": True,
                        "onboarding_step": {
                            "workspace_join": True,
                            "profile_complete": True,
                            "workspace_create": True,
                            "workspace_invite": True,
                        },
                    }
                    profile_serializer = ProfileSerializer(
                        profile, data=profile_data, partial=True
                    )
                    profile_serializer.is_valid(raise_exception=True)
                    profile_serializer.save()
                    logger.info(f"Profile created >>>>>>>>>>, {profile_serializer.data}")

                # Creates a default workspace, workspace member for admin user
                if event == WorkspaceManagementEvent.WORKSPACE_CREATED:
                    slug = data.get("slug")
                    workspace_name = data.get("workspace_name")
                    # Create workspace
                    if slug:
                        ws_serializer = WorkSpaceSerializer(
                            data={"slug": slug, "name": workspace_name}
                        )
                        ws_serializer.is_valid(raise_exception=True)
                        ws = ws_serializer.save(owner=user)
                        logger.info(
                            f"WORKSPACE_CREATED: Workspace Created >>>>>>>>>>>>>>, {ws}"
                        )

                    # Create member as ADMIN
                    WorkspaceMember.objects.create(
                        workspace_id=ws.id,
                        member=user,
                        role=ROLE.ADMIN.value,
                    )
                    logger.info(f"WORKSPACE_CREATED:Member Created>>>, {WorkspaceMember}")

                    # Seed asynchronously
                    workspace_seed.delay(ws.id)

                # Add Workspace member for invitation
                if event == WorkspaceManagementEvent.WORKSPACE_MEMBER_CREATED:
                    invitation_data = data.get("invitation", {})
                    # invitation_data = {slug: "", role: ""}
                    # Add invited member to all inviters having workspaces
                    WorkspaceMember.objects.create(
                        workspace=Workspace.objects.get(slug=invitation_data["slug"]),
                        member=user,
                        role=invitation_data["role"],
                    )

                    logger.info(f"WORKSPACE_MEMBER_CREATED: member created >>>>>>, {user}")

            # Update workspace member role as well as project member role
            if event == WorkspaceManagementEvent.WORKSPACE_MEMBER_ROLE_UPDATED:
                slug = data.get("slug")
                member_user = get_object_or_404(User, email=email)
                member_id = member_user.id
                if not slug:
                    raise ValidationError({"slug": "This field is required."})

                workspace_member = get_object_or_404(
                    WorkspaceMember.objects.select_related("workspace", "member"),
                    member_id=member_id,
                    workspace__slug=slug,
                    member__is_bot=False,
                    is_active=True,
                )

                # If moving to GUEST, enforce project roles to GUEST as well
                new_role = data.get("role")
                if new_role is not None and int(new_role) == ROLE.GUEST.value:
                    ProjectMember.objects.filter(
                        workspace__slug=slug, member_id=workspace_member.member_id
                    ).update(role=ROLE.GUEST.value)

                ws_member_serializer = WorkSpaceMemberSerializer(
                    workspace_member, data=data, partial=True
                )
                ws_member_serializer.is_valid(raise_exception=True)
                ws_member_serializer.save()

            # Deactivate workspace member and correspondent project member
            if event == WorkspaceManagementEvent.WORKSPACE_MEMBER_DELETED:
                member_user = get_object_or_404(User, email=email)
                member_id = member_user.id
                slug = data.get("slug")

                if not slug:
                    raise ValidationError({"slug": "This field is required."})

                workspace_member = get_object_or_404(
                    WorkspaceMember.objects.select_related("workspace", "member"),
                    workspace__slug=slug,
                    member_id=member_id,
                    member__is_bot=False,
                    is_active=True,
                )

                # Find projects that the user to remove currently is the only admin in the project
                projects = Project.objects.annotate(
                    total_members=Count("project_projectmember"),
                    member_with_role=Count(
                        "project_projectmember",
                        filter=Q(
                            project_projectmember__member_id=workspace_member.id,
                            project_projectmember__role=ROLE.ADMIN.value,
                        ),
                    ),
                ).filter(
                    total_members=1,
                    member_with_role=1,
                    workspace__slug=slug,
                )

                # Assign the oldest workspace admin to project admin
                # if user is the only ADMIN in any project of this workspace
                only_admin_in_any_project = projects.exists()
                if only_admin_in_any_project:
                    # get workspace by slug
                    workspace = get_object_or_404(Workspace, slug=slug)
                    # get workspace admins
                    admins_qs = (
                        WorkspaceMember.objects
                        .filter(workspace=workspace, role=ROLE.ADMIN.value, is_active=True)
                        .order_by("created_at")
                    )
                    # Pick the oldest admin
                    oldest_admin = admins_qs.first()
                    # assign the oldest workspace admin as project admin in those projects
                    if oldest_admin:
                        # Get the project you want to update
                        for project in projects:
                            # Either update an existing ProjectMember or create one
                            ProjectMember.objects.update_or_create(
                                project=project,
                                workspace=workspace,
                                member=oldest_admin.member,
                                defaults={"role": ROLE.ADMIN.value, "is_active": True},
                            )

                with transaction.atomic():
                    # Deactivate in all projects in this workspace
                    ProjectMember.objects.filter(
                        workspace__slug=slug,
                        member_id=workspace_member.member_id,
                        is_active=True,
                    ).update(is_active=False, updated_at=timezone.now())

                    # Deactivate workspace membership
                    workspace_member.is_active = False
                    workspace_member.save(update_fields=["is_active", "updated_at"])
        return Response(
            {"success": True, "source": event.value},
            status=status.HTTP_200_OK,
        )
