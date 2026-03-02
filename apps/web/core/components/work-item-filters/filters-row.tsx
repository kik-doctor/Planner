import { observer } from "mobx-react";
// planner imports
import type { IWorkItemFilterInstance } from "@planner/shared-state";
import type { TWorkItemFilterExpression, TWorkItemFilterProperty } from "@planner/types";
// components
import type { TFiltersRowProps } from "@/components/rich-filters/filters-row";
import { FiltersRow } from "@/components/rich-filters/filters-row";

type TWorkItemFiltersRowProps = TFiltersRowProps<TWorkItemFilterProperty, TWorkItemFilterExpression> & {
  filter: IWorkItemFilterInstance;
};

export const WorkItemFiltersRow = observer(function WorkItemFiltersRow(props: TWorkItemFiltersRowProps) {
  return <FiltersRow {...props} />;
});
