"use client";

import clsx from "clsx";
import { useContext } from "react";

import { dataTypes } from "@/constants/general";
import PromptContext from "@/context/PromptContext";

export default function Caption({ type }: CaptionProps) {
  const { prompts } = useContext(PromptContext);

  if (prompts.length === 0) {
    return null;
  }

  const captionClasses = clsx(
    "font-light italic m-0 px-9 pb-10 text-gray-400 text-caption",
    { "mt-5": type === dataTypes.geographic },
    { "mt-14": type === dataTypes.trend },
  );

  /**
   * Generates caption text based on section type and number of prompts.
   *
   * @param {string} sectionType - The type of section ('trend' or others).
   * @param {number} numberOfPrompts - The number of prompts.
   *
   * @returns {string} - Formula string based on the sectionType and numberOfPrompts.
   */
  const getCaptionText = (sectionType: string, numberOfPrompts: number) => {
    if (sectionType === dataTypes.trend) {
      return "Index = Page views for the observed date and prompt / Page views for the date with the most page views for any prompt * 100";
    }

    return numberOfPrompts > 1
      ? "Percentage = The page views for a prompt for the region selected / Sum of page views that come from all prompts for selected region"
      : "Index = Percentage of page views for a prompt from selected region /  Percentage of all page views that come from selected region on average";
  };

  return (
    <p className={captionClasses}>{getCaptionText(type, prompts.length)}</p>
  );
}
