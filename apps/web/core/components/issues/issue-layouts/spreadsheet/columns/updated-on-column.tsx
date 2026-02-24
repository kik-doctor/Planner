import React from "react";
import { observer } from "mobx-react";
// types
import type { TIssue } from "@planner/types";
// helpers
import { Row } from "@planner/ui";
import { renderFormattedDate } from "@planner/utils";

type Props = {
  issue: TIssue;
};

export const SpreadsheetUpdatedOnColumn = observer(function SpreadsheetUpdatedOnColumn(props: Props) {
  const { issue } = props;

  return (
    <Row className="flex h-11 w-full items-center border-b-[0.5px] border-custom-border-200 text-xs hover:bg-custom-background-80 group-[.selected-issue-row]:bg-custom-primary-100/5 group-[.selected-issue-row]:hover:bg-custom-primary-100/10">
      {renderFormattedDate(issue.updated_at)}
    </Row>
  );
});
