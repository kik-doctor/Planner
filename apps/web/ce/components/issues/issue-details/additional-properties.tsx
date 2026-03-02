import type { FC } from "react";
import React from "react";
// planner imports

export type TWorkItemAdditionalSidebarProperties = {
  workItemId: string;
  workItemTypeId: string | null;
  projectId: string;
  workspaceSlug: string;
  isEditable: boolean;
  isPeekView?: boolean;
};

export function WorkItemAdditionalSidebarProperties(_props: TWorkItemAdditionalSidebarProperties) {
  return <></>;
}
