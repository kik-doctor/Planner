import type { ReactNode } from "react";
// helpers
import { cn } from "@planner/utils";

export interface ContentWrapperProps {
  className?: string;
  children: ReactNode;
}

export function ContentWrapper({ className, children }: ContentWrapperProps) {
  return (
    <div className="h-full w-full overflow-hidden">
      <div className={cn("relative h-full w-full overflow-x-hidden overflow-y-scroll", className)}>{children}</div>
    </div>
  );
}
