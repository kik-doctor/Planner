import { useCallback, useMemo } from "react";
// planner editor
import type { TMentionSection } from "@planner/editor";
// planner types
import type { TSearchEntities, TSearchResponse } from "@planner/types";

export type TUseAdditionalEditorMentionArgs = {
  enableAdvancedMentions: boolean;
};

export type TAdditionalEditorMentionHandlerArgs = {
  response: TSearchResponse;
};

export type TAdditionalEditorMentionHandlerReturnType = {
  sections: TMentionSection[];
};

export type TAdditionalParseEditorContentArgs = {
  id: string;
  entityType: TSearchEntities;
};

export type TAdditionalParseEditorContentReturnType =
  | {
      redirectionPath: string;
      textContent: string;
    }
  | undefined;

export const useAdditionalEditorMention = (_args: TUseAdditionalEditorMentionArgs) => {
  const updateAdditionalSections = useCallback(
    (_args: TAdditionalEditorMentionHandlerArgs): TAdditionalEditorMentionHandlerReturnType => ({
      sections: [],
    }),
    []
  );

  const parseAdditionalEditorContent = useCallback(
    (_args: TAdditionalParseEditorContentArgs): TAdditionalParseEditorContentReturnType => undefined,
    []
  );

  const editorMentionTypes: TSearchEntities[] = useMemo(() => ["user_mention"], []);

  return {
    updateAdditionalSections,
    parseAdditionalEditorContent,
    editorMentionTypes,
  };
};
