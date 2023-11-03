import clsx from "clsx";

import {
  buttonGroupBgAltClasses,
  buttonGroupClasses,
  buttonGroupSelectedBgClasses,
} from "@/constants/ui";

const buttons = [
  { preset: "regions", label: "Region" },
  { preset: "planning_areas", label: "Planning Zone" },
];

export default function MapSourceSelector({
  disabled,
  mapSource,
  setMapSource,
}: {
  disabled: boolean;
  mapSource: MapSourcePreset;
  setMapSource: (source: MapSourcePreset) => void;
}) {
  /**
   * Handles the click event on the source selector buttons.
   *
   * When a button is clicked, the function retrieves the 'preset' value from
   * the button's dataset, which represents the selected map source preset.
   * The map source is then updated based on this preset.
   *
   * If no preset is available from the clicked button (a highly unlikely scenario),
   * the default 'regions' preset is assumed.
   *
   * @param {React.MouseEvent<HTMLButtonElement>} event - The event object containing information about the click event.
   *
   * @returns {void}
   */
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { preset = "regions" } = event.currentTarget.dataset;
    const presetValue = preset as MapSourcePreset;
    setMapSource(presetValue);
  };

  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      {buttons.map(({ preset, label }, index) => (
        <button
          key={preset}
          type="button"
          data-preset={preset}
          disabled={disabled}
          className={clsx(buttonGroupClasses, {
            "rounded-l-lg": index === 0,
            "rounded-r-md": index === buttons.length - 1,
            [buttonGroupSelectedBgClasses]: mapSource === preset,
            [buttonGroupBgAltClasses]: mapSource !== preset,
          })}
          onClick={handleClick}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
