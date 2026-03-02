import { useEffect } from "react";
import { observer } from "mobx-react";
import { USER_TRACKER_ELEMENTS } from "@planner/constants";
// ui
import { EModalPosition, EModalWidth, ModalCore } from "@planner/ui";
// components
import { ProductUpdatesFooter } from "@/components/global";
// helpers
import { captureView } from "@/helpers/event-tracker.helper";
// planner web components
import { ProductUpdatesChangelog } from "@/planner-web/components/global/product-updates/changelog";
import { ProductUpdatesHeader } from "@/planner-web/components/global/product-updates/header";

export type ProductUpdatesModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export const ProductUpdatesModal = observer(function ProductUpdatesModal(props: ProductUpdatesModalProps) {
  const { isOpen, handleClose } = props;

  useEffect(() => {
    if (isOpen) {
      captureView({ elementName: USER_TRACKER_ELEMENTS.PRODUCT_CHANGELOG_MODAL });
    }
  }, [isOpen]);

  return (
    <ModalCore isOpen={isOpen} handleClose={handleClose} position={EModalPosition.CENTER} width={EModalWidth.XXXXL}>
      <ProductUpdatesHeader />
      <ProductUpdatesChangelog />
      <ProductUpdatesFooter />
    </ModalCore>
  );
});
