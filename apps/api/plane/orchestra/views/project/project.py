# 3rd party imports
import jwt
# Django imports
from django.conf import settings
from django.db.models import Q, Exists, OuterRef, Func, F, Subquery, Prefetch

# Module imports
from plane.api.serializers import ProjectSerializer
from plane.db.models import Project, ProjectMember, Cycle, Module, DeployBoard, User
from plane.orchestra.views.base import BaseAPIView


class ProjectAPIEndpoint(BaseAPIView):
    """Project Endpoint"""

    serializer_class = ProjectSerializer
    model = Project
    use_read_replica = True

    def get_queryset(self):
        token = self.request.COOKIES.get("owsauth")
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        slug = payload.get("workspaceSlug")
        user = User.objects.get(email=payload.get('email'))
        return (
            Project.objects.filter(workspace__slug=slug)
            .filter(
                Q(
                    project_projectmember__member=user,
                    project_projectmember__is_active=True,
                )
                | Q(network=2)
            )
            .select_related(
                "workspace", "workspace__owner", "default_assignee", "project_lead"
            )
            .annotate(
                is_member=Exists(
                    ProjectMember.objects.filter(
                        member=user,
                        project_id=OuterRef("pk"),
                        workspace__slug=slug,
                        is_active=True,
                    )
                )
            )
            .annotate(
                total_members=ProjectMember.objects.filter(
                    project_id=OuterRef("id"), member__is_bot=False, is_active=True
                )
                .order_by()
                .annotate(count=Func(F("id"), function="Count"))
                .values("count")
            )
            .annotate(
                total_cycles=Cycle.objects.filter(project_id=OuterRef("id"))
                .order_by()
                .annotate(count=Func(F("id"), function="Count"))
                .values("count")
            )
            .annotate(
                total_modules=Module.objects.filter(project_id=OuterRef("id"))
                .order_by()
                .annotate(count=Func(F("id"), function="Count"))
                .values("count")
            )
            .annotate(
                member_role=ProjectMember.objects.filter(
                    project_id=OuterRef("pk"),
                    member_id=user.id,
                    is_active=True,
                ).values("role")
            )
            .annotate(
                is_deployed=Exists(
                    DeployBoard.objects.filter(
                        project_id=OuterRef("pk"),
                        workspace__slug=slug,
                    )
                )
            )
            .order_by(self.kwargs.get("order_by", "-created_at"))
            .distinct()
        )

    def get(self, request):
        """List projects
        Retrieve all projects in a workspace or get details of a specific project.
        Returns projects ordered by user's custom sort order with member information.
        """
        token = request.COOKIES.get("owsauth")
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        slug = payload.get("workspaceSlug")
        user = User.objects.get(email=payload.get('email'))
        sort_order_query = ProjectMember.objects.filter(
            member=user,
            project_id=OuterRef("pk"),
            workspace__slug=slug,
            is_active=True,
        ).values("sort_order")
        projects = (
            self.get_queryset()
            .annotate(sort_order=Subquery(sort_order_query))
            .prefetch_related(
                Prefetch(
                    "project_projectmember",
                    queryset=ProjectMember.objects.filter(
                        workspace__slug=slug, is_active=True
                    ).select_related("member"),
                )
            )
            .order_by(request.GET.get("order_by", "sort_order"))
        )
        return self.paginate(
            request=request,
            queryset=projects,
            on_results=lambda projects: ProjectSerializer(
                projects, many=True, fields=self.fields, expand=self.expand
            ).data,
        )
