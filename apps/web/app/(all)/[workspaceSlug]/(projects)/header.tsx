import { observer } from "mobx-react";
import { Shapes } from "lucide-react";
// planner imports
import { useTranslation } from "@planner/i18n";
import { Button } from "@planner/propel/button";
import { HomeIcon } from "@planner/propel/icons";
import { Breadcrumbs, Header } from "@planner/ui";
// components
import { BreadcrumbLink } from "@/components/common/breadcrumb-link";
// hooks
import { useHome } from "@/hooks/store/use-home";

export const WorkspaceDashboardHeader = observer(function WorkspaceDashboardHeader() {
  // planner hooks
  const { t } = useTranslation();
  // hooks
  const { toggleWidgetSettings } = useHome();

  return (
    <>
      <Header>
        <Header.LeftItem>
          <div className="flex items-center gap-2">
            <Breadcrumbs>
              <Breadcrumbs.Item
                component={
                  <BreadcrumbLink
                    label={t("home.title")}
                    icon={<HomeIcon className="h-4 w-4 text-custom-text-300" />}
                  />
                }
              />
            </Breadcrumbs>
          </div>
        </Header.LeftItem>
        <Header.RightItem>
          <Button
            variant="neutral-primary"
            size="sm"
            onClick={() => toggleWidgetSettings(true)}
            className="my-auto mb-0"
          >
            <Shapes size={16} />
            <div className="hidden text-xs font-medium sm:hidden md:block">{t("home.manage_widgets")}</div>
          </Button>
        </Header.RightItem>
      </Header>
    </>
  );
});
