// constants
import type { CORE_EXTENSIONS } from "@/constants/extension";
// planner editor imports
import type { TAdditionalEditorAsset } from "@/planner-editor/types/asset";

export type TEditorImageAsset = {
  href: string;
  id: string;
  name: string;
  src: string;
  type: CORE_EXTENSIONS.IMAGE | CORE_EXTENSIONS.CUSTOM_IMAGE;
};

export type TEditorAsset = TEditorImageAsset | TAdditionalEditorAsset;
