import { observer } from "mobx-react";
import { useParams } from "next/navigation";
// ui
import { PROJECT_VIEW_TRACKER_ELEMENTS } from "@planner/constants";
import { Button } from "@planner/propel/button";
import { ViewsIcon } from "@planner/propel/icons";
import { Breadcrumbs, Header } from "@planner/ui";
// components
import { BreadcrumbLink } from "@/components/common/breadcrumb-link";
import { ViewListHeader } from "@/components/views/view-list-header";
// hooks
import { useCommandPalette } from "@/hooks/store/use-command-palette";
import { useProject } from "@/hooks/store/use-project";
// planner web imports
import { CommonProjectBreadcrumbs } from "@/planner-web/components/breadcrumbs/common";

export const ProjectViewsHeader = observer(function ProjectViewsHeader() {
  const { workspaceSlug, projectId } = useParams();
  // store hooks
  const { toggleCreateViewModal } = useCommandPalette();
  const { loader } = useProject();

  return (
    <>
      <Header>
        <Header.LeftItem>
          <Breadcrumbs isLoading={loader === "init-loader"}>
            <CommonProjectBreadcrumbs workspaceSlug={workspaceSlug?.toString()} projectId={projectId?.toString()} />
            <Breadcrumbs.Item
              component={
                <BreadcrumbLink
                  label="Views"
                  href={`/${workspaceSlug}/projects/${projectId}/views/`}
                  icon={<ViewsIcon className="h-4 w-4 text-custom-text-300" />}
                  isLast
                />
              }
              isLast
            />
          </Breadcrumbs>
        </Header.LeftItem>
        <Header.RightItem>
          <ViewListHeader />
          <div>
            <Button
              data-ph-element={PROJECT_VIEW_TRACKER_ELEMENTS.RIGHT_HEADER_ADD_BUTTON}
              variant="primary"
              size="sm"
              onClick={() => toggleCreateViewModal(true)}
            >
              Add view
            </Button>
          </div>
        </Header.RightItem>
      </Header>
    </>
  );
});
