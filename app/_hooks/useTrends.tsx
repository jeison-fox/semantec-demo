import { enqueueSnackbar } from "notistack";
import { useCallback, useContext } from "react";

import fetchTrends from "@/actions/trends";
import { dataTypes } from "@/constants/general";
import DataVisualizationContext from "@/context/DataVisualizationContext";
import usePrompt from "@/hooks/usePrompt";
import { generateSnackBarParams } from "@/utils/general";

const useTrends = () => {
  const fetchAndProcessPromptItemData = usePrompt(dataTypes.trend);
  const {
    setLoadingTrends,
    setTrendsAverages,
    setTrendsData,
    setUrlMetadataCache,
  } = useContext(DataVisualizationContext);

  /**
   * Fetches and sets the trends data based on the provided date range and prompts.
   *
   * @param {DateRange} dateRange - The date range to fetch the trends data for.
   * @param {string[]} prompts - An array of prompts for which the trends data is to be fetched.
   */
  return useCallback(
    async (dateRange: DateRange, prompts: string[]) => {
      setLoadingTrends(true);

      try {
        const trends = await fetchTrends({ dateRange, prompts });
        const [data, error] = trends as TrendsResponse;

        if (error) {
          const snackBarParams = generateSnackBarParams(
            "error",
            error.statusCode,
            "trends",
          );

          enqueueSnackbar(snackBarParams.message, {
            key: snackBarParams.key,
            variant: snackBarParams.variant,
          });
        }

        if (data?.[1]?.data) {
          const trendsData = data[1].data;
          setTrendsData(trendsData);

          if (data?.[2]?.averages) {
            setTrendsAverages(data[2].averages);
          }

          const newPromptItemCache =
            await fetchAndProcessPromptItemData(trendsData);

          setUrlMetadataCache(newPromptItemCache);
        }
      } catch (error) {
        if (error instanceof ErrorEvent) {
          enqueueSnackbar(error.message, {
            key: "process-trends",
            variant: "error",
          });
        }
      } finally {
        setLoadingTrends(false);
      }
    },
    [
      fetchAndProcessPromptItemData,
      setLoadingTrends,
      setTrendsAverages,
      setTrendsData,
      setUrlMetadataCache,
    ],
  );
};

export default useTrends;
