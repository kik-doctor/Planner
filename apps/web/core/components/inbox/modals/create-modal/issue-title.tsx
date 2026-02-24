import type { FC } from "react";
import { observer } from "mobx-react";
// planner imports
import { ETabIndices } from "@planner/constants";
import { useTranslation } from "@planner/i18n";
import type { TIssue } from "@planner/types";
import { Input } from "@planner/ui";
// helpers
import { getTabIndex } from "@planner/utils";
// hooks
import { usePlatformOS } from "@/hooks/use-platform-os";

type TInboxIssueTitle = {
  data: Partial<TIssue>;
  handleData: (issueKey: keyof Partial<TIssue>, issueValue: Partial<TIssue>[keyof Partial<TIssue>]) => void;
  isTitleLengthMoreThan255Character?: boolean;
};

export const InboxIssueTitle = observer(function InboxIssueTitle(props: TInboxIssueTitle) {
  const { data, handleData, isTitleLengthMoreThan255Character } = props;
  // hooks
  const { isMobile } = usePlatformOS();

  const { getIndex } = getTabIndex(ETabIndices.INTAKE_ISSUE_FORM, isMobile);
  const { t } = useTranslation();
  return (
    <div className="space-y-1">
      <Input
        id="name"
        name="name"
        type="text"
        value={data?.name}
        onChange={(e) => handleData("name", e.target.value)}
        placeholder={t("title")}
        className="w-full text-base"
        tabIndex={getIndex("name")}
        required
      />
      {isTitleLengthMoreThan255Character && (
        <span className="text-xs text-red-500">{t("title_should_be_less_than_255_characters")}</span>
      )}
    </div>
  );
});
