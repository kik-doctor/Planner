"use client";

import React, { useState } from "react";
import { observer } from "mobx-react";
import { useParams } from "next/navigation";
import { FileText, HelpCircle, MessagesSquare, User } from "lucide-react";
import { useTranslation } from "@planner/i18n";
// ui
import { Tooltip } from "@planner/propel/tooltip";
import { CustomMenu, ToggleSwitch } from "@planner/ui";
// components
import { cn } from "@planner/utils";
import { ProductUpdatesModal } from "@/components/global";
// helpers
// hooks
import { useCommandPalette } from "@/hooks/store/use-command-palette";
import { useInstance } from "@/hooks/store/use-instance";
// import { useTransient } from "@/hooks/store/use-transient";
// import { useUserSettings } from "@/hooks/store/user";
import { usePlatformOS } from "@/hooks/use-platform-os";
// planner web components
// import { PlannerVersionNumber } from "@/planner-web/components/global";

export interface WorkspaceHelpSectionProps {
  setSidebarActive?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HelpMenu: React.FC<WorkspaceHelpSectionProps> = observer(() => {
  const { workspaceSlug, projectId } = useParams();
  // store hooks
  const { t } = useTranslation();
  // const { toggleShortcutModal } = useCommandPalette();
  const { isMobile } = usePlatformOS();
  const { config } = useInstance();
  // const { isIntercomToggle, toggleIntercom } = useTransient();
  // const { canUseLocalDB, toggleLocalDB } = useUserSettings();
  // states
  const [isNeedHelpOpen, setIsNeedHelpOpen] = useState(false);
  const [isProductUpdatesModalOpen, setProductUpdatesModalOpen] = useState(false);

  // const handleCrispWindowShow = () => {
  //   toggleIntercom(!isIntercomToggle);
  // };

  return (
    <>
      <ProductUpdatesModal isOpen={isProductUpdatesModalOpen} handleClose={() => setProductUpdatesModalOpen(false)} />
      <div className="relative flex flex-shrink-0 items-center gap-1 justify-evenly">
        <CustomMenu
          customButton={
            <div
              className={cn(
                "grid place-items-center rounded-md p-1 outline-none text-custom-text-200 hover:text-custom-text-100 hover:bg-custom-background-90",
                {
                  "bg-custom-background-90": isNeedHelpOpen,
                }
              )}
            >
              <Tooltip tooltipContent="Help" isMobile={isMobile} disabled={isNeedHelpOpen}>
                <HelpCircle className="h-[18px] w-[18px] outline-none" />
              </Tooltip>
            </div>
          }
          customButtonClassName="relative grid place-items-center rounded-md p-1.5 outline-none"
          menuButtonOnClick={() => !isNeedHelpOpen && setIsNeedHelpOpen(true)}
          onMenuClose={() => setIsNeedHelpOpen(false)}
          placement="top-end"
          maxHeight="lg"
          closeOnSelect
        >
          <CustomMenu.MenuItem>
            <a
              href="https://docs.oneworkspacex.com"
              target="_blank"
              className="flex items-center justify- gap-x-2 rounded text-xs hover:bg-custom-background-80"
              rel="noreferrer"
            >
              <FileText className="h-3.5 w-3.5 text-custom-text-200" size={14} />
              <span className="text-xs">{t("documentation")}</span>
            </a>
          </CustomMenu.MenuItem>
          {/*{config?.intercom_app_id && config?.is_intercom_enabled && (*/}
          {/*  <CustomMenu.MenuItem>*/}
          {/*    <button*/}
          {/*      type="button"*/}
          {/*      onClick={handleCrispWindowShow}*/}
          {/*      className="flex w-full items-center gap-x-2 rounded text-xs hover:bg-custom-background-80"*/}
          {/*    >*/}
          {/*      <MessagesSquare className="h-3.5 w-3.5 text-custom-text-200" />*/}
          {/*      <span className="text-xs">{t("message_support")}</span>*/}
          {/*    </button>*/}
          {/*  </CustomMenu.MenuItem>*/}
          {/*)}*/}
          <CustomMenu.MenuItem>
            <a
              href="mailto:sales@oneworkspacex.com"
              target="_blank"
              className="flex items-center justify- gap-x-2 rounded text-xs hover:bg-custom-background-80"
              rel="noreferrer"
            >
              <User className="h-3.5 w-3.5 text-custom-text-200" size={14} />
              <span className="text-xs">{t("contact_sales")}</span>
            </a>
          </CustomMenu.MenuItem>
          <div className="my-1 border-t border-custom-border-200" />
          {/*<CustomMenu.MenuItem>*/}
          {/*  <div*/}
          {/*    onClick={(e) => {*/}
          {/*      e.preventDefault();*/}
          {/*      e.stopPropagation();*/}
          {/*    }}*/}
          {/*    className="flex w-full items-center justify-between text-xs hover:bg-custom-background-80"*/}
          {/*  >*/}
          {/*    <span className="racking-tight">{t("hyper_mode")}</span>*/}
          {/*    <ToggleSwitch*/}
          {/*      value={canUseLocalDB}*/}
          {/*      onChange={() => toggleLocalDB(workspaceSlug?.toString(), projectId?.toString())}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</CustomMenu.MenuItem>*/}
          {/*<CustomMenu.MenuItem>*/}
          {/*  <button*/}
          {/*    type="button"*/}
          {/*    onClick={() => toggleShortcutModal(true)}*/}
          {/*    className="flex w-full items-center justify-start text-xs hover:bg-custom-background-80"*/}
          {/*  >*/}
          {/*    <span className="text-xs">{t("keyboard_shortcuts")}</span>*/}
          {/*  </button>*/}
          {/*</CustomMenu.MenuItem>*/}
          {/*<CustomMenu.MenuItem>*/}
          {/*  <button*/}
          {/*    type="button"*/}
          {/*    onClick={() => setProductUpdatesModalOpen(true)}*/}
          {/*    className="flex w-full items-center justify-start text-xs hover:bg-custom-background-80"*/}
          {/*  >*/}
          {/*    <span className="text-xs">{t("whats_new")}</span>*/}
          {/*  </button>*/}
          {/*</CustomMenu.MenuItem>*/}
          {/*<CustomMenu.MenuItem>*/}
          {/*  <a*/}
          {/*    href="https://discord.com/invite/543UADxY"*/}
          {/*    target="_blank"*/}
          {/*    className="flex items-center justify- gap-x-2 rounded text-xs hover:bg-custom-background-80"*/}
          {/*  >*/}
          {/*    <span className="text-xs">Discord</span>*/}
          {/*  </a>*/}
          {/*</CustomMenu.MenuItem>*/}
          {/*<div className="px-1 pt-2 mt-1 text-xs text-custom-text-200 border-t border-custom-border-200">*/}
          {/*  <PlannerVersionNumber />*/}
          {/*</div>*/}
        </CustomMenu>
      </div>
    </>
  );
});
