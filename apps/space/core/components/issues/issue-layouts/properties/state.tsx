import { observer } from "mobx-react";
// planner ui
import { StateGroupIcon } from "@planner/propel/icons";
import { Tooltip } from "@planner/propel/tooltip";
import type { TStateGroups } from "@planner/types";
// planner utils
import { cn } from "@planner/utils";
//hooks
import { useStates } from "@/hooks/store/use-state";

type Props = {
  shouldShowBorder?: boolean;
} & (
  | {
      stateDetails: {
        name: string;
        group: TStateGroups;
      };
    }
  | {
      stateId: string;
    }
);

export const IssueBlockState = observer(function IssueBlockState(props: Props) {
  const { shouldShowBorder = true } = props;
  // store hooks
  const { getStateById } = useStates();
  // derived values
  const state = "stateId" in props ? getStateById(props.stateId) : props.stateDetails;
  if (!state) return null;

  return (
    <Tooltip tooltipHeading="State" tooltipContent={state.name}>
      <div
        className={cn("flex h-full w-full items-center justify-between gap-1 rounded px-2.5 py-1 text-xs", {
          "border-[0.5px] border-custom-border-300": shouldShowBorder,
        })}
      >
        <div className="flex w-full items-center gap-1.5">
          <StateGroupIcon stateGroup={state.group} />
          <div className="text-xs">{state.name}</div>
        </div>
      </div>
    </Tooltip>
  );
});
