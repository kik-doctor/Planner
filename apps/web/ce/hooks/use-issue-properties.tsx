import type { TIssueServiceType } from "@planner/types";

export const useWorkItemProperties = (
  projectId: string | null | undefined,
  workspaceSlug: string | null | undefined,
  workItemId: string | null | undefined,
  issueServiceType: TIssueServiceType
) => {
  if (!projectId || !workspaceSlug || !workItemId) return;
};
