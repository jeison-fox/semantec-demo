/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import { useCallback, useContext, useEffect, useState } from "react";
import { BiMessageAltError } from "react-icons/bi";

import MapTooltipLegend from "@/components/map/MapTooltipLegend";
import {
  gradientColorMap,
  multiplePromptRange,
  singlePromptGradientColors,
  singlePromptRange,
} from "@/constants/colors";
import DataVisualizationContext from "@/context/DataVisualizationContext";
import MapTooltipContext from "@/context/MapTooltipContext";
import interpolateColor from "@/utils/color";

export default function MapTooltip() {
  const { loadingOpenGraph, urlMetadataCache } = useContext(
    DataVisualizationContext,
  );
  const { mapTooltipData } = useContext(MapTooltipContext);
  const [tooltipMetadata, setTooltipMetadata] =
    useState<MapTooltipMetadata | null>(null);

  const leftOffset = 50;

  /**
   * Creates a legend item for a given prompt.
   *
   * @param {MapTooltipItemPrompt} prompt - The prompt object containing a `key` representing the prompt type
   * and a `value` representing the prompt's textual description.
   * @param {number[]} range - The range of values within which the color interpolation should occur.
   * @param {string[]} colors - The array of color values to use for interpolation.
   *
   * @returns {JSX.Element} The `MapTooltipLegend` component representing the legend item for the given prompt.
   */
  const createLegend = (
    prompt: MapTooltipItemPrompt,
    range: number[],
    colors: string[],
    single: boolean = false,
  ): JSX.Element => {
    const bgColor = interpolateColor(prompt.value, range, colors);
    return (
      <MapTooltipLegend
        prompt={prompt}
        bgColor={bgColor}
        key={prompt.key}
        single={single}
      />
    );
  };

  /**
   * Generates a list of JSX elements representing the legends for provided prompts. Each legend consists
   * of a colored block (representing the type of prompt) followed by the prompt's value as text.
   *
   * @param {MapTooltipItemPrompt[]} prompts - An array of prompt objects to generate legends for.
   * Each prompt object should have a `key` representing the prompt type and a `value` representing the prompt's textual description.
   *
   * @returns {JSX.Element[]} An array of JSX elements for the provided prompts.
   */
  const getPromptLegends = (prompts: MapTooltipItemPrompt[]) => {
    if (prompts.length === 1) {
      return createLegend(
        prompts[0],
        singlePromptRange,
        singlePromptGradientColors,
        true,
      );
    }

    return prompts.map((prompt) =>
      createLegend(prompt, multiplePromptRange, gradientColorMap[prompt.key]),
    );
  };

  /**
   * Retrieve metadata for the tooltip based on the highest-priority prompt.
   *
   * This function checks if there's valid tooltip data and if there are cached metadata
   * for the URLs associated with the prompt. If valid metadata exists, it updates the
   * tooltip's metadata state with the title, source, and image of the top URL.
   */
  const getTooltipMetadata = useCallback(() => {
    if (
      !mapTooltipData ||
      !mapTooltipData.prompts ||
      mapTooltipData.prompts.length === 0 ||
      Object.keys(urlMetadataCache).length === 0
    ) {
      return;
    }

    const highestPrompt: MapTooltipItemPrompt = mapTooltipData.prompts[0];
    const highestPrompUrls = highestPrompt.url;

    if (highestPrompUrls.length === 0) return;

    const topUrl = highestPrompUrls[0];

    if (topUrl in urlMetadataCache) {
      const metadata: PromptItemDisplayData = urlMetadataCache[topUrl];

      setTooltipMetadata({
        body: metadata.title,
        source: metadata.source,
        image: metadata.image,
      });
    }
  }, [mapTooltipData, urlMetadataCache]);

  useEffect(() => {
    getTooltipMetadata();
  }, [getTooltipMetadata, mapTooltipData, urlMetadataCache]);

  return (
    <article
      className={clsx(
        "absolute bg-gray-900 p-3 pointer-events-none rounded z-50",
        mapTooltipData?.noData ? "w-36" : "w-[290px]",
      )}
      style={{
        left: (mapTooltipData?.coordinates.x ?? 0) + leftOffset,
        top: mapTooltipData?.coordinates.y,
      }}
    >
      {mapTooltipData?.noData ? (
        <p className="flex flex-col gap-y-2 items-center justify-center m-0 text-center text-white">
          <BiMessageAltError className="h-8 w-8" />
          <span className="font-semibold text-sm text-[0.8125rem]">
            No data found for {mapTooltipData?.title}
          </span>
        </p>
      ) : (
        <>
          <h4 className="font-semibold mb-3 text-xs text-[0.8125rem] text-white">
            {mapTooltipData?.title}
          </h4>
          <div className="flex gap-x-3">
            {loadingOpenGraph && (
              <div className="bg-gray-600 h-20 rounded shrink-0 w-[90px] animate-pulse" />
            )}
            {!loadingOpenGraph && tooltipMetadata && tooltipMetadata.image && (
              <div className="shrink-0 h-20 w-[90px] rounded relative overflow-hidden">
                <img
                  src={tooltipMetadata.image}
                  alt={mapTooltipData?.title}
                  className="h-full w-full object-cover absolute inset-0"
                />
              </div>
            )}
            <div className="grow">
              {loadingOpenGraph && (
                <>
                  <div className="bg-gray-600 h-2 mb-0.5 rounded-sm w-full animate-pulse" />
                  <div className="bg-gray-600 h-2 mb-0.5 rounded-sm w-full animate-pulse" />
                  <div className="bg-gray-600 h-2 mb-0.5 rounded-sm w-full animate-pulse" />
                  <div className="bg-gray-600 h-2 mb-0.5 rounded-sm w-full animate-pulse" />
                  <div className="bg-gray-600 h-2 mb-4 rounded-sm w-1/3 animate-pulse" />
                </>
              )}
              {!loadingOpenGraph && tooltipMetadata && tooltipMetadata.body && (
                <p className="font-medium leading-[1.125rem] m-0 text-xs text-white">
                  {tooltipMetadata.body}
                </p>
              )}
              {!loadingOpenGraph &&
                tooltipMetadata &&
                tooltipMetadata.source && (
                  <p className="break-all leading-[1.125rem] m-0 mb-4 text-gray-400 text-xs">
                    {tooltipMetadata.source}
                  </p>
                )}
              {mapTooltipData?.prompts && (
                <div className="grid grid-cols-2 gap-y-3 gap-x-5">
                  {getPromptLegends(mapTooltipData.prompts)}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </article>
  );
}
