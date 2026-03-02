import { observer } from "mobx-react";
// planner types
import { EUserPermissionsLevel } from "@planner/constants";
// components
import { useTranslation } from "@planner/i18n";
import type { TPowerKContext } from "@/components/power-k/core/types";
import { PowerKSettingsMenu } from "@/components/power-k/menus/settings";
// hooks
import { useUserPermissions } from "@/hooks/store/user";
import { PROJECT_SETTINGS } from "@/planner-web/constants/project";

type Props = {
  context: TPowerKContext;
  handleSelect: (href: string) => void;
};

export const PowerKOpenProjectSettingsMenu = observer(function PowerKOpenProjectSettingsMenu(props: Props) {
  const { context, handleSelect } = props;
  // planner hooks
  const { t } = useTranslation();
  // store hooks
  const { allowPermissions } = useUserPermissions();
  // derived values
  const settingsList = Object.values(PROJECT_SETTINGS).filter(
    (setting) =>
      context.params.workspaceSlug &&
      context.params.projectId &&
      allowPermissions(
        setting.access,
        EUserPermissionsLevel.PROJECT,
        context.params.workspaceSlug?.toString(),
        context.params.projectId?.toString()
      )
  );
  const settingsListWithIcons = settingsList.map((setting) => ({
    ...setting,
    label: t(setting.i18n_label),
    icon: setting.Icon,
  }));

  return <PowerKSettingsMenu settings={settingsListWithIcons} onSelect={(setting) => handleSelect(setting.href)} />;
});
