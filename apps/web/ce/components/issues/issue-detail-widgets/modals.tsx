import type { FC } from "react";
// planner types
import type { TIssueServiceType, TWorkItemWidgets } from "@planner/types";

export type TWorkItemAdditionalWidgetModalsProps = {
  hideWidgets: TWorkItemWidgets[];
  issueServiceType: TIssueServiceType;
  projectId: string;
  workItemId: string;
  workspaceSlug: string;
};

export function WorkItemAdditionalWidgetModals(_props: TWorkItemAdditionalWidgetModalsProps) {
  return null;
}
