import { observer } from "mobx-react";
// planner imports
import { StateGroupIcon } from "@planner/propel/icons";
import type { TStateGroups } from "@planner/types";
// components
import { SingleProgressStats } from "@/components/core/sidebar/single-progress-stats";

export type TStateGroupData = {
  state: string | undefined;
  completed: number;
  total: number;
}[];

type TStateGroupStatComponent = {
  selectedStateGroups: string[];
  handleStateGroupFiltersUpdate: (stateGroup: string | undefined) => void;
  distribution: TStateGroupData;
  totalIssuesCount: number;
  isEditable?: boolean;
};

export const StateGroupStatComponent = observer(function StateGroupStatComponent(props: TStateGroupStatComponent) {
  const { distribution, isEditable, totalIssuesCount, selectedStateGroups, handleStateGroupFiltersUpdate } = props;

  return (
    <div>
      {distribution.map((group, index) => (
        <SingleProgressStats
          key={index}
          title={
            <div className="flex items-center gap-2">
              <StateGroupIcon stateGroup={group.state as TStateGroups} />
              <span className="text-xs capitalize">{group.state}</span>
            </div>
          }
          completed={group.completed}
          total={totalIssuesCount}
          {...(isEditable && {
            onClick: () => group.state && handleStateGroupFiltersUpdate(group.state),
            selected: group.state ? selectedStateGroups.includes(group.state) : false,
          })}
        />
      ))}
    </div>
  );
});
