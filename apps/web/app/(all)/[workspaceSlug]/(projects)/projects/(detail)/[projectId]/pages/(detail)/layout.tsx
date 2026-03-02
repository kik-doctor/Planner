// component
import { Outlet } from "react-router";
import useSWR from "swr";
import { AppHeader } from "@/components/core/app-header";
import { ContentWrapper } from "@/components/core/content-wrapper";
// planner web hooks
import { EPageStoreType, usePageStore } from "@/planner-web/hooks/store";
// local components
import type { Route } from "./+types/layout";
import { PageDetailsHeader } from "./header";

export default function ProjectPageDetailsLayout({ params }: Route.ComponentProps) {
  const { workspaceSlug, projectId } = params;
  const { fetchPagesList } = usePageStore(EPageStoreType.PROJECT);
  // fetching pages list
  useSWR(`PROJECT_PAGES_${projectId}`, () => fetchPagesList(workspaceSlug, projectId));
  return (
    <>
      <AppHeader header={<PageDetailsHeader />} />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </>
  );
}
