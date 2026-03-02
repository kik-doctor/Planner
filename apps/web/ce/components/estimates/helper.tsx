import type { TEstimateSystemKeys } from "@planner/types";
import { EEstimateSystem } from "@planner/types";

export const isEstimateSystemEnabled = (key: TEstimateSystemKeys) => {
  switch (key) {
    case EEstimateSystem.POINTS:
      return true;
    case EEstimateSystem.CATEGORIES:
      return true;
    default:
      return false;
  }
};
