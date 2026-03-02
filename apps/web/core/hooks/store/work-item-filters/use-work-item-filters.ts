import { useContext } from "react";
// planner imports
import type { IWorkItemFilterStore } from "@planner/shared-state";
// context
import { StoreContext } from "@/lib/store-context";

export const useWorkItemFilters = (): IWorkItemFilterStore => {
  const context = useContext(StoreContext);
  if (context === undefined) throw new Error("useWorkItemFilters must be used within StoreProvider");
  return context.workItemFilters;
};
