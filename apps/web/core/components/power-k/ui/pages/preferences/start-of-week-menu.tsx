import React from "react";
import { Command } from "cmdk";
// planner imports
import { START_OF_THE_WEEK_OPTIONS } from "@planner/constants";
import type { EStartOfTheWeek } from "@planner/types";
// local imports
import { PowerKModalCommandItem } from "../../modal/command-item";

type Props = {
  onSelect: (day: EStartOfTheWeek) => void;
};

export function PowerKPreferencesStartOfWeekMenu(props: Props) {
  const { onSelect } = props;

  return (
    <Command.Group>
      {START_OF_THE_WEEK_OPTIONS.map((day) => (
        <PowerKModalCommandItem key={day.value} onSelect={() => onSelect(day.value)} label={day.label} />
      ))}
    </Command.Group>
  );
}
