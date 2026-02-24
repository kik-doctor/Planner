// types
import type { TTimelineTypeCore } from "@planner/types";
import { GANTT_TIMELINE_TYPE } from "@planner/types";
// planner-web

import type { IBaseTimelineStore } from "@/planner-web/store/timeline/base-timeline.store";
import type { ITimelineStore } from "../store/timeline";

export const getTimelineStore = (
  timelineStore: ITimelineStore,
  timelineType: TTimelineTypeCore
): IBaseTimelineStore => {
  if (timelineType === GANTT_TIMELINE_TYPE.ISSUE) {
    return timelineStore.issuesTimeLineStore as IBaseTimelineStore;
  }
  if (timelineType === GANTT_TIMELINE_TYPE.MODULE) {
    return timelineStore.modulesTimeLineStore as IBaseTimelineStore;
  }
  if (timelineType === GANTT_TIMELINE_TYPE.PROJECT) {
    return timelineStore.projectTimeLineStore;
  }
  if (timelineType === GANTT_TIMELINE_TYPE.GROUPED) {
    return timelineStore.groupedTimeLineStore;
  }
  throw new Error(`Unknown timeline type: ${timelineType}`);
};
