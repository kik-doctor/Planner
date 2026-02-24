import { observer } from "mobx-react";
import { useTranslation } from "@planner/i18n";
import { AnalyticsIcon } from "@planner/propel/icons";
// planner imports
import { Breadcrumbs, Header } from "@planner/ui";
// components
import { BreadcrumbLink } from "@/components/common/breadcrumb-link";

export const WorkspaceAnalyticsHeader = observer(function WorkspaceAnalyticsHeader() {
  const { t } = useTranslation();
  return (
    <Header>
      <Header.LeftItem>
        <Breadcrumbs>
          <Breadcrumbs.Item
            component={
              <BreadcrumbLink
                label={t("workspace_analytics.label")}
                icon={<AnalyticsIcon className="h-4 w-4 text-custom-text-300" />}
              />
            }
          />
        </Breadcrumbs>
      </Header.LeftItem>
    </Header>
  );
});
