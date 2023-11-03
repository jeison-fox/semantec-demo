import clsx from "clsx";
import { IoCloseSharp } from "react-icons/io5";

import { chipColors, singleChipColor } from "@/constants/colors";

export default function PromptTypeaheadChip({
  chip,
  index = 0,
  onClick,
  single = false,
}: PromptChipProps) {
  const textColor = single ? "text-gray-800" : "text-white";
  const backgroundColor = single ? singleChipColor : chipColors[index];

  return (
    <span
      key={chip.id}
      className={clsx(
        "pl-3 pr-2 py-0.5 rounded-md inline-flex items-center text-sm font-medium",
        textColor,
        backgroundColor,
      )}
    >
      {chip.value}
      <button
        type="button"
        data-chip-id={chip.id}
        onClick={onClick}
        className="ml-1"
      >
        <IoCloseSharp className={clsx("w-4 h-4", textColor)} />
      </button>
    </span>
  );
}
