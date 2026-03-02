import type { FC } from "react";
import type { TIssueActivityComment } from "@planner/types";

type TIssueActivityWorklog = {
  workspaceSlug: string;
  projectId: string;
  issueId: string;
  activityComment: TIssueActivityComment;
  ends?: "top" | "bottom";
};

export function IssueActivityWorklog(_props: TIssueActivityWorklog) {
  return <></>;
}
