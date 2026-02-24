import { autorun } from "mobx";
// planner-web
import type { RootStore } from "@/planner-web/store/root.store";
import type { IBaseTimelineStore } from "@/planner-web/store/timeline/base-timeline.store";
import { BaseTimeLineStore } from "@/planner-web/store/timeline/base-timeline.store";

export interface IIssuesTimeLineStore extends IBaseTimelineStore {
  isDependencyEnabled: boolean;
}

export class IssuesTimeLineStore extends BaseTimeLineStore implements IIssuesTimeLineStore {
  constructor(_rootStore: RootStore) {
    super(_rootStore);

    autorun(() => {
      const getIssueById = this.rootStore.issue.issues.getIssueById;
      this.updateBlocks(getIssueById);
    });
  }
}
