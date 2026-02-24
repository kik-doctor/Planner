// assets
import { useTranslation } from "@planner/i18n";
import packageJson from "package.json";

export function PlannerVersionNumber() {
  const { t } = useTranslation();
  return (
    <span>
      {t("version")}: v{packageJson.version}
    </span>
  );
}
