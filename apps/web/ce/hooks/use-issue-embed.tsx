// editor
import type { TEmbedConfig } from "@planner/editor";
// planner types
import type { TSearchEntityRequestPayload, TSearchResponse } from "@planner/types";
// planner web components
import { IssueEmbedUpgradeCard } from "@/planner-web/components/pages";

export type TIssueEmbedHookProps = {
  fetchEmbedSuggestions?: (payload: TSearchEntityRequestPayload) => Promise<TSearchResponse>;
  projectId?: string;
  workspaceSlug?: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useIssueEmbed = (props: TIssueEmbedHookProps) => {
  const widgetCallback = () => <IssueEmbedUpgradeCard />;

  const issueEmbedProps: TEmbedConfig["issue"] = {
    widgetCallback,
  };

  return {
    issueEmbedProps,
  };
};
