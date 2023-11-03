"use client";

import clsx from "clsx";
import { useContext } from "react";

import {
  buttonGroupBgClasses,
  buttonGroupClasses,
  buttonGroupSelectedBgClasses,
} from "@/constants/ui";
import DateSelectorContext from "@/context/DateSelectorContext";
import { getFixedDateRange } from "@/utils/date";

const buttons = [
  { preset: "pastMonth", label: "Past month" },
  { preset: "30days", label: "Last 30 days" },
  { preset: "7days", label: "Last 7 days" },
];

export default function AppBarDateGroupSelector() {
  const { datePreset, setDateRange, setDatePreset } =
    useContext(DateSelectorContext);

  /**
   * Handles the click event for the date preset buttons.
   *
   * This function retrieves the "preset" attribute from the clicked button's dataset
   * and determines the appropriate date range based on this preset using the
   * `getFixedDateRange` function. If the retrieved preset is different from the
   * currently selected preset (`datePreset`), the context's preset and date range
   * values are updated accordingly.
   *
   * The "preset" attribute is expected to be one of the following values:
   * "pastMonth", "30days", "7days", or "custom". If no preset is found in the dataset,
   * it defaults to "pastMonth".
   *
   * @param {React.MouseEvent<HTMLButtonElement>} event - The mouse click event triggered
   * by one of the date preset buttons.
   */
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { preset = "pastMonth" } = event.currentTarget.dataset;
    const presetValue = preset as DateRangePreset;

    if (presetValue !== datePreset) {
      const fixedDateRange = getFixedDateRange(presetValue);
      setDatePreset(presetValue);
      setDateRange(fixedDateRange);
    }
  };

  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      {buttons.map(({ preset, label }, index) => (
        <button
          key={preset}
          type="button"
          data-preset={preset}
          className={clsx(buttonGroupClasses, {
            "rounded-l-lg": index === 0,
            "rounded-r-md": index === buttons.length - 1,
            [buttonGroupSelectedBgClasses]: datePreset === preset,
            [buttonGroupBgClasses]: datePreset !== preset,
          })}
          onClick={handleClick}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
