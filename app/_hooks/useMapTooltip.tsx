"use client";

import { useCallback, useContext } from "react";

import MapTooltipContext from "@/context/MapTooltipContext";
import { isPromptEntry } from "@/utils/prompt";

const useMapTooltip = () => {
  const { mapTooltipItems, setMapTooltipData, setShowMapTooltip } =
    useContext(MapTooltipContext);

  /**
   * Handles mousemove event on Mapbox layers to display a tooltip for the associated feature.
   * Only displays the tooltip if the current feature differs from the previously feature.
   *
   * @param {mapboxgl.MapLayerMouseEvent} event - The triggered mouse event from the Mapbox layer.
   *
   * @returns {void}
   */
  const displayMapTooltip = useCallback(
    (event: mapboxgl.MapLayerMouseEvent) => {
      const { features, point } = event;

      if (!features || features.length === 0) return;

      const feature = features[0];
      const featureId = feature.properties?.id as string;
      const featureName = feature.properties?.name as string;

      if (mapTooltipItems.length === 0 || !featureName) return;

      const mapTooltipItem = mapTooltipItems.find(
        (item) => item.id === featureId,
      );

      if (!mapTooltipItem) {
        setMapTooltipData({
          coordinates: point,
          noData: true,
          title: featureName,
        });
      } else {
        setMapTooltipData({
          coordinates: point,
          noData: false,
          prompts: mapTooltipItem.prompts,
          title: featureName,
        });
      }

      setShowMapTooltip(true);
    },
    [mapTooltipItems, setMapTooltipData, setShowMapTooltip],
  );

  /**
   * Handles mouseleave on Mapbox layers to hide a tooltip for the associated feature.
   *
   * @param {mapboxgl.MapLayerMouseEvent} e - The triggered mouse event from the Mapbox layer.
   *
   * @returns {void}
   */
  const hideMapTooltip = useCallback(() => {
    setMapTooltipData(null);
    setShowMapTooltip(false);
  }, [setMapTooltipData, setShowMapTooltip]);

  /**
   * Extracts prompts from a `GeographicItem` and transforms them into `MapTooltipItemPrompt` format.
   *
   * @param {GeographicItem} geoItem - Geographic item to process.
   *
   * @returns {MapTooltipItemPrompt[]} - Sorted array of prompts in the required format.
   */
  const extractPromptsFromGeoItem = useCallback(
    (geoItem: GeographicItem): MapTooltipItemPrompt[] => {
      return Object.entries(geoItem)
        .filter(isPromptEntry)
        .map(([key, value]) => ({
          key,
          value: value.value,
          url: value.url,
        }))
        .sort((a, b) => b.value - a.value);
    },
    [],
  );

  /**
   * Transforms a `GeographicItem` into a `MapTooltipItem` format.
   * If the geoItem lacks any prompts, it returns null.
   *
   * @param {GeographicItem} geoItem - Item to be transformed.
   *
   * @returns {MapTooltipItem | null} - Transformed item or null if no valid prompts found.
   */
  const transformGeoItemToMapTooltipItem = useCallback(
    (geoItem: GeographicItem): MapTooltipItem | null => {
      const prompts = extractPromptsFromGeoItem(geoItem);

      if (prompts.length === 0) return null;

      return {
        id: geoItem.id,
        prompts,
      };
    },
    [extractPromptsFromGeoItem],
  );

  /**
   * Converts an array of `GeographicItem` into an array of `MapTooltipItem`.
   * Filters out any items that couldn't be transformed.
   *
   * @param {GeographicItem[]} geoData - Array of items to be transformed.
   *
   * @returns {MapTooltipItem[]} - Array of transformed tooltip items.
   */
  const getMapTooltipItems = useCallback(
    (geoData: GeographicItem[]): MapTooltipItem[] => {
      return geoData.reduce((acc: MapTooltipItem[], geoItem) => {
        const item = transformGeoItemToMapTooltipItem(geoItem);

        if (item) {
          return [...acc, item];
        }

        return acc;
      }, []);
    },
    [transformGeoItemToMapTooltipItem],
  );

  return {
    displayMapTooltip,
    getMapTooltipItems,
    hideMapTooltip,
  };
};

export default useMapTooltip;
