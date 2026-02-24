import { USER_TRACKER_ELEMENTS } from "@planner/constants";
import { useTranslation } from "@planner/i18n";
// ui
import { getButtonStyling } from "@planner/propel/button";
import { PlannerLogo } from "@planner/propel/icons";
// helpers
import { cn } from "@planner/utils";

export function ProductUpdatesFooter() {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between flex-shrink-0 gap-4 m-6 mb-4">
      <div className="flex items-center gap-2">
        <a
          href="https://go.planner.oneworkspacex.com/p-docs"
          target="_blank"
          className="text-sm text-custom-text-200 hover:text-custom-text-100 hover:underline underline-offset-1 outline-none"
          rel="noreferrer"
        >
          {t("docs")}
        </a>
        <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
          <circle cx={1} cy={1} r={1} />
        </svg>
        <a
          data-ph-element={USER_TRACKER_ELEMENTS.CHANGELOG_REDIRECTED}
          href="https://go.planner.oneworkspacex.com/p-changelog"
          target="_blank"
          className="text-sm text-custom-text-200 hover:text-custom-text-100 hover:underline underline-offset-1 outline-none"
          rel="noreferrer"
        >
          {t("full_changelog")}
        </a>
        <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
          <circle cx={1} cy={1} r={1} />
        </svg>
        <a
          href="mailto:hello@oneworkspacex.com"
          target="_blank"
          className="text-sm text-custom-text-200 hover:text-custom-text-100 hover:underline underline-offset-1 outline-none"
          rel="noreferrer"
        >
          {t("support")}
        </a>
        <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
          <circle cx={1} cy={1} r={1} />
        </svg>
        <a
          href="https://discord.com/invite/543UADxY"
          target="_blank"
          className="text-sm text-custom-text-200 hover:text-custom-text-100 hover:underline underline-offset-1 outline-none"
          rel="noreferrer"
        >
          Discord
        </a>
      </div>
      <a
        href="https://planner.oneworkspacex.com/pages"
        target="_blank"
        className={cn(
          getButtonStyling("accent-primary", "sm"),
          "flex gap-1.5 items-center text-center font-medium hover:underline underline-offset-2 outline-none"
        )}
        rel="noreferrer"
      >
        <PlannerLogo className="h-4 w-auto text-custom-text-100" />
        {t("powered_by_planner_pages")}
      </a>
    </div>
  );
}
