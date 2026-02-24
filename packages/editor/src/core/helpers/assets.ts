import type { Node as ProseMirrorNode } from "@tiptap/pm/model";
// planner imports
import type { ADDITIONAL_EXTENSIONS } from "@planner/utils";
import { CORE_EXTENSIONS } from "@planner/utils";
// extensions
import { getImageBlockId } from "@/extensions/custom-image/utils";
// planner editor imports
import { ADDITIONAL_ASSETS_META_DATA_RECORD } from "@/planner-editor/constants/assets";
// types
import type { TEditorAsset } from "@/types";

export type TAssetMetaDataRecord = (attrs: ProseMirrorNode["attrs"]) => TEditorAsset | undefined;

export const CORE_ASSETS_META_DATA_RECORD: Partial<
  Record<CORE_EXTENSIONS | ADDITIONAL_EXTENSIONS, TAssetMetaDataRecord>
> = {
  [CORE_EXTENSIONS.IMAGE]: (attrs) => {
    if (!attrs?.src) return;
    return {
      href: `#${getImageBlockId(attrs?.id ?? "")}`,
      id: attrs?.id,
      name: `image-${attrs?.id}`,
      size: 0,
      src: attrs?.src,
      type: CORE_EXTENSIONS.IMAGE,
    };
  },
  [CORE_EXTENSIONS.CUSTOM_IMAGE]: (attrs) => {
    if (!attrs?.src) return;
    return {
      href: `#${getImageBlockId(attrs?.id ?? "")}`,
      id: attrs?.id,
      name: `image-${attrs?.id}`,
      size: 0,
      src: attrs?.src,
      type: CORE_EXTENSIONS.CUSTOM_IMAGE,
    };
  },
  ...ADDITIONAL_ASSETS_META_DATA_RECORD,
};
