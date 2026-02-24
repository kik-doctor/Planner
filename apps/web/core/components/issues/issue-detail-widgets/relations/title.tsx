import type { FC } from "react";
import React, { useMemo } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "@planner/i18n";
import type { TIssueServiceType } from "@planner/types";
import { EIssueServiceType } from "@planner/types";
import { CollapsibleButton } from "@planner/ui";
// hooks
import { useIssueDetail } from "@/hooks/store/use-issue-detail";
// planner-web
import { useTimeLineRelationOptions } from "@/planner-web/components/relations";
// local imports
import { RelationActionButton } from "./quick-action-button";

type Props = {
  isOpen: boolean;
  issueId: string;
  disabled: boolean;
  issueServiceType?: TIssueServiceType;
};

export const RelationsCollapsibleTitle = observer(function RelationsCollapsibleTitle(props: Props) {
  const { isOpen, issueId, disabled, issueServiceType = EIssueServiceType.ISSUES } = props;
  const { t } = useTranslation();
  // store hook
  const {
    relation: { getRelationCountByIssueId },
  } = useIssueDetail(issueServiceType);

  const ISSUE_RELATION_OPTIONS = useTimeLineRelationOptions();
  // derived values
  const relationsCount = getRelationCountByIssueId(issueId, ISSUE_RELATION_OPTIONS);

  // indicator element
  const indicatorElement = useMemo(
    () => (
      <span className="flex items-center justify-center ">
        <p className="text-base text-custom-text-300 !leading-3">{relationsCount}</p>
      </span>
    ),
    [relationsCount]
  );

  return (
    <CollapsibleButton
      isOpen={isOpen}
      title={t("common.relations")}
      indicatorElement={indicatorElement}
      actionItemElement={
        !disabled && <RelationActionButton issueId={issueId} disabled={disabled} issueServiceType={issueServiceType} />
      }
    />
  );
});
