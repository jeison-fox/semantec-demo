import clsx from "clsx";
import { usePathname } from "next/navigation";

import PromptItem from "@/components/prompt-item/PromptItem";
import { promptTwBgColors, singleChipColor } from "@/constants/colors";
import { dataTypes } from "@/constants/general";

export default function ContentSidebarItem({
  item,
  single,
}: ContentSideBarItemProps) {
  const pathname = usePathname();
  const isGeographic = pathname.includes(dataTypes.geographic);
  const bgColorClass: string = promptTwBgColors[item.promptKey];

  return (
    <article
      className={clsx(
        "border-0 border-solid border-b border-gray-700 relative",
        isGeographic ? "pb-4" : "pb-8",
        `content-sidebar-item-${item.promptKey}-${item.letter}`,
      )}
    >
      {!isGeographic && item.letter && (
        <div
          className={`${bgColorClass} flex items-center justify-center mb-2 rounded-full h-6 w-6 text-sm text-white`}
        >
          {item.letter}
        </div>
      )}
      <div className="flex gap-x-2">
        <PromptItem promptItem={item} />
      </div>
      {isGeographic && (
        <div
          className={clsx(
            "font-medium mt-2 overflow-hidden px-3 py-1 rounded-md text-sm text-ellipsis whitespace-nowrap",
            single ? singleChipColor : bgColorClass,
            single ? "text-gray-800" : "text-white",
          )}
        >
          {item.promptTerm}
        </div>
      )}
    </article>
  );
}
