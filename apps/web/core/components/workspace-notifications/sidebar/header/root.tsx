import { observer } from "mobx-react";
// planner imports
import { useTranslation } from "@planner/i18n";
import { InboxIcon } from "@planner/propel/icons";
import { Breadcrumbs, Header } from "@planner/ui";
// components
import { BreadcrumbLink } from "@/components/common/breadcrumb-link";
// local imports
import { NotificationSidebarHeaderOptions } from "./options";

type TNotificationSidebarHeader = {
  workspaceSlug: string;
};

export const NotificationSidebarHeader = observer(function NotificationSidebarHeader(
  props: TNotificationSidebarHeader
) {
  const { workspaceSlug } = props;
  const { t } = useTranslation();

  if (!workspaceSlug) return <></>;
  return (
    <Header className="my-auto bg-custom-background-100">
      <Header.LeftItem>
        <Breadcrumbs>
          <Breadcrumbs.Item
            component={
              <BreadcrumbLink
                label={t("notification.label")}
                icon={<InboxIcon className="h-4 w-4 text-custom-text-300" />}
                disableTooltip
              />
            }
          />
        </Breadcrumbs>
      </Header.LeftItem>
      <Header.RightItem>
        <NotificationSidebarHeaderOptions workspaceSlug={workspaceSlug} />
      </Header.RightItem>
    </Header>
  );
});
