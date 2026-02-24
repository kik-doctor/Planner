import type { FC } from "react";
import React from "react";
import type { IIssueDisplayProperties, TIssue } from "@planner/types";

export type TWorkItemLayoutAdditionalProperties = {
  displayProperties: IIssueDisplayProperties;
  issue: TIssue;
};

export function WorkItemLayoutAdditionalProperties(props: TWorkItemLayoutAdditionalProperties) {
  return <></>;
}
