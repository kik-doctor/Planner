import type { EPageStoreType } from "@/planner-web/hooks/store";
// store
import type { TPageInstance } from "@/store/pages/base-page";

export type TPageShareControlProps = {
  page: TPageInstance;
  storeType: EPageStoreType;
};

export function PageShareControl({}: TPageShareControlProps) {
  return null;
}
