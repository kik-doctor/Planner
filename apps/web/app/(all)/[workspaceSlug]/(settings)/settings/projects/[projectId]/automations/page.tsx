import { observer } from "mobx-react";
import { EUserPermissions, EUserPermissionsLevel } from "@planner/constants";
import { useTranslation } from "@planner/i18n";
import { TOAST_TYPE, setToast } from "@planner/propel/toast";
import type { IProject } from "@planner/types";
// ui
// components
import { NotAuthorizedView } from "@/components/auth-screens/not-authorized-view";
import { AutoArchiveAutomation, AutoCloseAutomation } from "@/components/automation";
import { PageHead } from "@/components/core/page-title";
// hooks
import { SettingsContentWrapper } from "@/components/settings/content-wrapper";
import { SettingsHeading } from "@/components/settings/heading";
import { useProject } from "@/hooks/store/use-project";
import { useUserPermissions } from "@/hooks/store/user";
// planner web imports
import { CustomAutomationsRoot } from "@/planner-web/components/automations/root";
import type { Route } from "./+types/page";

function AutomationSettingsPage({ params }: Route.ComponentProps) {
  // router
  const { workspaceSlug, projectId } = params;
  // store hooks
  const { workspaceUserInfo, allowPermissions } = useUserPermissions();
  const { currentProjectDetails: projectDetails, updateProject } = useProject();

  const { t } = useTranslation();

  // derived values
  const canPerformProjectAdminActions = allowPermissions([EUserPermissions.ADMIN], EUserPermissionsLevel.PROJECT);

  const handleChange = async (formData: Partial<IProject>) => {
    if (!projectDetails) return;

    try {
      await updateProject(workspaceSlug, projectId, formData);
    } catch {
      setToast({
        type: TOAST_TYPE.ERROR,
        title: "Error!",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  // derived values
  const pageTitle = projectDetails?.name ? `${projectDetails?.name} - Automations` : undefined;

  if (workspaceUserInfo && !canPerformProjectAdminActions) {
    return <NotAuthorizedView section="settings" isProjectView className="h-auto" />;
  }

  return (
    <SettingsContentWrapper size="lg">
      <PageHead title={pageTitle} />
      <section className={`w-full ${canPerformProjectAdminActions ? "" : "opacity-60"}`}>
        <SettingsHeading
          title={t("project_settings.automations.heading")}
          description={t("project_settings.automations.description")}
        />
        <AutoArchiveAutomation handleChange={handleChange} />
        <AutoCloseAutomation handleChange={handleChange} />
      </section>
      <CustomAutomationsRoot projectId={projectId} workspaceSlug={workspaceSlug} />
    </SettingsContentWrapper>
  );
}

export default observer(AutomationSettingsPage);
