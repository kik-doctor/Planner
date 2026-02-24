import { useFormContext } from "react-hook-form";
// planner imports
import { ETabIndices } from "@planner/constants";
import { useTranslation } from "@planner/i18n";
import { Button } from "@planner/propel/button";
import type { IProject } from "@planner/types";
// ui
// helpers
import { getTabIndex } from "@planner/utils";

type Props = {
  handleClose: () => void;
  isMobile?: boolean;
};

function ProjectCreateButtons(props: Props) {
  const { t } = useTranslation();
  const { handleClose, isMobile = false } = props;
  const {
    formState: { isSubmitting },
  } = useFormContext<IProject>();

  const { getIndex } = getTabIndex(ETabIndices.PROJECT_CREATE, isMobile);

  return (
    <div className="flex justify-end gap-2 py-4 border-t border-custom-border-100">
      <Button variant="neutral-primary" size="sm" onClick={handleClose} tabIndex={getIndex("cancel")}>
        {t("common.cancel")}
      </Button>
      <Button variant="primary" type="submit" size="sm" loading={isSubmitting} tabIndex={getIndex("submit")}>
        {isSubmitting ? t("creating") : t("create_project")}
      </Button>
    </div>
  );
}

export default ProjectCreateButtons;
