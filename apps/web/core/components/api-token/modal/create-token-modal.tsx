import React, { useState } from "react";
import { mutate } from "swr";
// planner imports
import { PROFILE_SETTINGS_TRACKER_EVENTS } from "@planner/constants";
import { TOAST_TYPE, setToast } from "@planner/propel/toast";
import { APITokenService } from "@planner/services";
import type { IApiToken } from "@planner/types";
import { EModalPosition, EModalWidth, ModalCore } from "@planner/ui";
import { renderFormattedDate, csvDownload } from "@planner/utils";
// constants
import { API_TOKENS_LIST } from "@/constants/fetch-keys";
// helpers
import { captureError, captureSuccess } from "@/helpers/event-tracker.helper";
// local imports
import { CreateApiTokenForm } from "./form";
import { GeneratedTokenDetails } from "./generated-token-details";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

// services
const apiTokenService = new APITokenService();

export function CreateApiTokenModal(props: Props) {
  const { isOpen, onClose } = props;
  // states
  const [neverExpires, setNeverExpires] = useState<boolean>(false);
  const [generatedToken, setGeneratedToken] = useState<IApiToken | null | undefined>(null);

  const handleClose = () => {
    onClose();

    setTimeout(() => {
      setNeverExpires(false);
      setGeneratedToken(null);
    }, 350);
  };

  const downloadSecretKey = (data: IApiToken) => {
    const csvData = {
      Title: data.label,
      Description: data.description,
      Expiry: data.expired_at ? (renderFormattedDate(data.expired_at)?.replace(",", " ") ?? "") : "Never expires",
      "Secret key": data.token ?? "",
    };

    csvDownload(csvData, `secret-key-${Date.now()}`);
  };

  const handleCreateToken = async (data: Partial<IApiToken>) => {
    // make the request to generate the token
    await apiTokenService
      .create(data)
      .then((res) => {
        setGeneratedToken(res);
        downloadSecretKey(res);

        mutate<IApiToken[]>(
          API_TOKENS_LIST,
          (prevData) => {
            if (!prevData) return;

            return [res, ...prevData];
          },
          false
        );
        captureSuccess({
          eventName: PROFILE_SETTINGS_TRACKER_EVENTS.pat_created,
          payload: {
            token: res.id,
          },
        });
      })
      .catch((err) => {
        setToast({
          type: TOAST_TYPE.ERROR,
          title: "Error!",
          message: err.message || err.detail,
        });

        captureError({
          eventName: PROFILE_SETTINGS_TRACKER_EVENTS.pat_created,
        });

        throw err;
      });
  };

  return (
    <ModalCore isOpen={isOpen} handleClose={() => {}} position={EModalPosition.TOP} width={EModalWidth.XXL}>
      {generatedToken ? (
        <GeneratedTokenDetails handleClose={handleClose} tokenDetails={generatedToken} />
      ) : (
        <CreateApiTokenForm
          handleClose={handleClose}
          neverExpires={neverExpires}
          toggleNeverExpires={() => setNeverExpires((prevData) => !prevData)}
          onSubmit={handleCreateToken}
        />
      )}
    </ModalCore>
  );
}
