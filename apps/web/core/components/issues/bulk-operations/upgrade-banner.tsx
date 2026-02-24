import { MARKETING_PLANNER_ONE_PAGE_LINK } from "@planner/constants";
import { getButtonStyling } from "@planner/propel/button";
import { cn } from "@planner/utils";

type Props = {
  className?: string;
};

export function BulkOperationsUpgradeBanner(props: Props) {
  const { className } = props;

  return (
    <div className={cn("sticky bottom-0 left-0 h-20 z-[2] px-3.5 grid place-items-center", className)}>
      <div className="h-14 w-full bg-custom-primary-100/10 border-[0.5px] border-custom-primary-100/50 py-4 px-3.5 flex items-center justify-between gap-2 rounded-md">
        <p className="text-custom-primary-100 font-medium">
          Change state, priority, and more for several work items at once. Save three minutes on an average per
          operation.
        </p>
        <a
          href={MARKETING_PLANNER_ONE_PAGE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(getButtonStyling("primary", "sm"), "flex-shrink-0")}
        >
          Upgrade to One
        </a>
      </div>
    </div>
  );
}
