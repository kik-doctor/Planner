import React from "react";
// icons
import { SquareArrowOutUpRight } from "lucide-react";
// planner internal packages
import { getButtonStyling } from "@planner/propel/button";
import { cn } from "@planner/utils";

export function UpgradeButton() {
  return (
    <a
      href="https://planner.oneworkspacex.com/pricing?mode=self-hosted"
      target="_blank"
      className={cn(getButtonStyling("primary", "sm"))}
      rel="noreferrer"
    >
      Upgrade
      <SquareArrowOutUpRight className="h-3.5 w-3.5 p-0.5" />
    </a>
  );
}
