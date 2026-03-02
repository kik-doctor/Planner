// components
import { Outlet } from "react-router";
import { AppHeader } from "@/components/core/app-header";
import { ContentWrapper } from "@/components/core/content-wrapper";
// local components
import { ProjectsListHeader } from "@/planner-web/components/projects/header";
import { ProjectsListMobileHeader } from "@/planner-web/components/projects/mobile-header";

export default function ProjectListLayout() {
  return (
    <>
      <AppHeader header={<ProjectsListHeader />} mobileHeader={<ProjectsListMobileHeader />} />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </>
  );
}
