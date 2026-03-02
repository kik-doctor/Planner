// planner imports
import type { ADDITIONAL_EXTENSIONS } from "@planner/utils";
import { CORE_EXTENSIONS } from "@planner/utils";
// planner editor imports
import type { ExtensionFileSetStorageKey } from "@/planner-editor/types/storage";

export type NodeFileMapType = Partial<
  Record<
    CORE_EXTENSIONS | ADDITIONAL_EXTENSIONS,
    {
      fileSetName: ExtensionFileSetStorageKey;
    }
  >
>;

export const NODE_FILE_MAP: NodeFileMapType = {
  [CORE_EXTENSIONS.IMAGE]: {
    fileSetName: "deletedImageSet",
  },
  [CORE_EXTENSIONS.CUSTOM_IMAGE]: {
    fileSetName: "deletedImageSet",
  },
};
