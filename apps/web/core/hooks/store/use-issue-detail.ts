import { useContext } from "react";
import type { TIssueServiceType } from "@planner/types";
import { EIssueServiceType } from "@planner/types";
// mobx store
import { StoreContext } from "@/lib/store-context";
// types
import type { IIssueDetail } from "@/planner-web/store/issue/issue-details/root.store";

export const useIssueDetail = (serviceType: TIssueServiceType = EIssueServiceType.ISSUES): IIssueDetail => {
  const context = useContext(StoreContext);
  if (context === undefined) throw new Error("useIssueDetail must be used within StoreProvider");
  if (serviceType === EIssueServiceType.EPICS) return context.issue.epicDetail;
  else return context.issue.issueDetail;
};
