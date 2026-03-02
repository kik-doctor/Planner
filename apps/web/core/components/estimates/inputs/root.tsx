import type { FC } from "react";
// planner imports
import type { TEstimateSystemKeys } from "@planner/types";
import { EEstimateSystem } from "@planner/types";
// planner web imports
import { EstimateTimeInput } from "@/planner-web/components/estimates/inputs";
// local imports
import { EstimateNumberInput } from "./number-input";
import { EstimateTextInput } from "./text-input";

type TEstimateInputRootProps = {
  estimateType: TEstimateSystemKeys;
  handleEstimateInputValue: (value: string) => void;
  value?: string;
};

export function EstimateInputRoot(props: TEstimateInputRootProps) {
  const { estimateType, handleEstimateInputValue, value } = props;

  switch (estimateType) {
    case EEstimateSystem.POINTS:
      return (
        <EstimateNumberInput
          value={value ? parseInt(value) : undefined}
          handleEstimateInputValue={handleEstimateInputValue}
        />
      );
    case EEstimateSystem.CATEGORIES:
      return <EstimateTextInput value={value} handleEstimateInputValue={handleEstimateInputValue} />;
    case EEstimateSystem.TIME:
      return (
        <EstimateTimeInput
          value={value ? parseInt(value) : undefined}
          handleEstimateInputValue={handleEstimateInputValue}
        />
      );
    default:
      return null;
  }
}
