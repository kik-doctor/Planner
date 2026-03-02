import { WEBSITE_URL } from "@planner/constants";
// assets
import { PlannerLogo } from "@planner/propel/icons";

type TPoweredBy = {
  disabled?: boolean;
};

export function PoweredBy(props: TPoweredBy) {
  // props
  const { disabled = false } = props;

  if (disabled || !WEBSITE_URL) return null;

  return (
    <a
      href={WEBSITE_URL}
      className="fixed bottom-2.5 right-5 !z-[999999] flex items-center gap-1 rounded border border-custom-border-200 bg-custom-background-100 px-2 py-1 shadow-custom-shadow-2xs"
      target="_blank"
      rel="noreferrer noopener"
    >
      <PlannerLogo className="h-3 w-auto text-custom-text-100" />
      <div className="text-xs">
        Powered by <span className="font-semibold">Planner Publish</span>
      </div>
    </a>
  );
}
