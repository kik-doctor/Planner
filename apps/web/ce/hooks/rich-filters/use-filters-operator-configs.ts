import type { TSupportedOperators } from "@planner/types";
import { CORE_OPERATORS } from "@planner/types";

export type TFiltersOperatorConfigs = {
  allowedOperators: Set<TSupportedOperators>;
  allowNegative: boolean;
};

export type TUseFiltersOperatorConfigsProps = {
  workspaceSlug: string;
};

export const useFiltersOperatorConfigs = (_props: TUseFiltersOperatorConfigsProps): TFiltersOperatorConfigs => ({
  allowedOperators: new Set(Object.values(CORE_OPERATORS)),
  allowNegative: false,
});
