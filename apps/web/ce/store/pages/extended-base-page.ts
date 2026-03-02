import type { TPage, TPageExtended } from "@planner/types";
import type { RootStore } from "@/planner-web/store/root.store";
import type { TBasePageServices } from "@/store/pages/base-page";

export type TExtendedPageInstance = TPageExtended & {
  asJSONExtended: TPageExtended;
};

export class ExtendedBasePage implements TExtendedPageInstance {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(store: RootStore, page: TPage, services: TBasePageServices) {}

  get asJSONExtended(): TExtendedPageInstance["asJSONExtended"] {
    return {};
  }
}
