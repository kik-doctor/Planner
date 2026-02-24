import { memo } from "react";
import { ArrowUpWideNarrow, ArrowDownWideNarrow } from "lucide-react";
// planner package imports
import type { E_SORT_ORDER } from "@planner/constants";
import { getButtonStyling } from "@planner/propel/button";
import { cn } from "@planner/utils";

export type TActivitySortRoot = {
  sortOrder: E_SORT_ORDER;
  toggleSort: () => void;
  className?: string;
  iconClassName?: string;
};
export const ActivitySortRoot = memo(function ActivitySortRoot(props: TActivitySortRoot) {
  return (
    <div
      className={cn(
        getButtonStyling("neutral-primary", "sm"),
        "px-2 text-custom-text-300 cursor-pointer",
        props.className
      )}
      onClick={() => {
        props.toggleSort();
      }}
    >
      {props.sortOrder === "asc" ? (
        <ArrowUpWideNarrow className={cn("size-4", props.iconClassName)} />
      ) : (
        <ArrowDownWideNarrow className={cn("size-4", props.iconClassName)} />
      )}
    </div>
  );
});

ActivitySortRoot.displayName = "ActivitySortRoot";
