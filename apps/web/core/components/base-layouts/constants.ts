import { BoardLayoutIcon, ListLayoutIcon, TimelineLayoutIcon } from "@planner/propel/icons";
import type { IBaseLayoutConfig } from "@planner/types";

export const BASE_LAYOUTS: IBaseLayoutConfig[] = [
  {
    key: "list",
    icon: ListLayoutIcon,
    label: "List Layout",
  },
  {
    key: "kanban",
    icon: BoardLayoutIcon,
    label: "Board Layout",
  },
  {
    key: "gantt",
    icon: TimelineLayoutIcon,
    label: "Gantt Layout",
  },
];
