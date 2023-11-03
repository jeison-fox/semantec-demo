import { enqueueSnackbar } from "notistack";
import { useCallback, useContext } from "react";

import fetchGeographic from "@/actions/geographic";
import { dataTypes } from "@/constants/general";
import DataVisualizationContext from "@/context/DataVisualizationContext";
import MapTooltipContext from "@/context/MapTooltipContext";
import useMapTooltip from "@/hooks/useMapTooltip";
import usePrompt from "@/hooks/usePrompt";
import { generateSnackBarParams } from "@/utils/general";

const useGeoData = (mapSource: string) => {
  const fetchAndProcessPromptItemData = usePrompt(dataTypes.geographic);
  const { setLoadingGeographic, setGeographicData, setUrlMetadataCache } =
    useContext(DataVisualizationContext);
  const { getMapTooltipItems } = useMapTooltip();
  const { setMapTooltipItems } = useContext(MapTooltipContext);

  /**
   * Fetches the geographic data.
   *
   * @param {DateRange} dateRange - The date range.
   * @param {string[]} prompts - An array of prompts.
   *
   * @returns {Promise<GeographicItem[]>} The fetched geographic data.
   */
  const fetchAndSetGeographicData = useCallback(
    async (
      dateRange: DateRange,
      prompts: string[],
    ): Promise<GeographicItem[]> => {
      const geographic = await fetchGeographic({ dateRange, prompts });
      const [data, error] = geographic as GeographicResponse;

      if (error) {
        const snackBarParams = generateSnackBarParams(
          "error",
          error.statusCode,
          "geo",
        );

        enqueueSnackbar(snackBarParams.message, {
          key: snackBarParams.key,
          variant: snackBarParams.variant,
        });
      }

      if (data?.[1]?.data && mapSource in data[1].data) {
        return mapSource === "regions"
          ? data[1].data.regions
          : data[1].data.planning_areas;
      }

      return [];
    },
    [mapSource],
  );

  /**
   * Processes and sets the prompt item cache.
   *
   * @param {GeographicItem[]} geoData - The geographic data.
   */
  const processAndSetPromptItemCache = useCallback(
    async (geoData: GeographicItem[]) => {
      const newPromptItemCache = await fetchAndProcessPromptItemData(geoData);
      setUrlMetadataCache(newPromptItemCache);
    },
    [fetchAndProcessPromptItemData, setUrlMetadataCache],
  );

  /**
   * Generates and sets the map tooltip items.
   *
   * @param {GeographicItem[]} geoData - The geographic data.
   */
  const generateAndSetMapTooltipItems = useCallback(
    (geoData: GeographicItem[]) => {
      const items = getMapTooltipItems(geoData);
      setMapTooltipItems(items);
    },
    [getMapTooltipItems, setMapTooltipItems],
  );

  /**
   * Fetches and sets the geographic data based on the provided date range and prompts.
   *
   * @param {DateRange} dateRange - The date range to fetch the trends data for.
   * @param {string[]} prompts - An array of prompts for which the trends data is to be fetched.
   */
  return useCallback(
    async (dateRange: DateRange, prompts: string[]) => {
      setLoadingGeographic(true);

      try {
        const geoData = await fetchAndSetGeographicData(dateRange, prompts);
        setGeographicData(geoData);
        generateAndSetMapTooltipItems(geoData);

        await processAndSetPromptItemCache(geoData);
      } catch (error) {
        if (error instanceof ErrorEvent) {
          enqueueSnackbar(error.message, {
            key: "process-geo",
            variant: "error",
          });
        }
      } finally {
        setLoadingGeographic(false);
      }
    },
    [
      setLoadingGeographic,
      fetchAndSetGeographicData,
      setGeographicData,
      processAndSetPromptItemCache,
      generateAndSetMapTooltipItems,
    ],
  );
};

export default useGeoData;
