// planner imports
import type { TSaveViewOptions, TUpdateViewOptions } from "@planner/constants";
import type { IWorkItemFilterInstance } from "@planner/shared-state";
import type {
  EIssuesStoreType,
  IIssueFilters,
  TWorkItemFilterExpression,
  TWorkItemFilterProperty,
} from "@planner/types";

export type TSharedWorkItemFiltersProps = {
  entityType: EIssuesStoreType; // entity type (project, cycle, workspace, teamspace, etc)
  filtersToShowByLayout: TWorkItemFilterProperty[];
  updateFilters: (updatedFilters: TWorkItemFilterExpression) => void;
  isTemporary?: boolean;
  showOnMount?: boolean;
} & ({ isTemporary: true; entityId?: string } | { isTemporary?: false; entityId: string }); // entity id (project_id, cycle_id, workspace_id, etc)

export type TSharedWorkItemFiltersHOCProps = TSharedWorkItemFiltersProps & {
  children: React.ReactNode | ((props: { filter: IWorkItemFilterInstance | undefined }) => React.ReactNode);
  initialWorkItemFilters: IIssueFilters | undefined;
};

export type TEnableSaveViewProps = {
  enableSaveView?: boolean;
  saveViewOptions?: Omit<TSaveViewOptions<TWorkItemFilterExpression>, "onViewSave">;
};

export type TEnableUpdateViewProps = {
  enableUpdateView?: boolean;
  updateViewOptions?: Omit<TUpdateViewOptions<TWorkItemFilterExpression>, "onViewUpdate">;
};
