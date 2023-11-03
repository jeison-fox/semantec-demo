import { enqueueSnackbar } from "notistack";
import { useCallback, useContext } from "react";

import retrieveUrlDetails from "@/actions/opengraph";
import { dataTypes } from "@/constants/general";
import DataVisualizationContext from "@/context/DataVisualizationContext";
import PromptContext from "@/context/PromptContext";
import { generateSnackBarParams } from "@/utils/general";
import { isPromptItem, isPromptKey } from "@/utils/prompt";

const usePrompt = (dataType: "trend" | "geographic") => {
  const { setLoadingOpenGraph } = useContext(DataVisualizationContext);
  const { setHighlightedPromptItems } = useContext(PromptContext);

  /**
   * Processes the provided trend or geographic data to extract unique URLs.
   *
   * @param data - An array of either trend or geographic items.
   *
   * @returns An array of unique URLs from the processed data.
   */
  const extractUrls = useCallback(
    (data: TrendItem[] | GeographicItem[]) => {
      const allUrls: string[] = [];

      data.forEach((item) => {
        Object.entries(item).forEach(([key, value]) => {
          if (
            isPromptKey(key) &&
            isPromptItem(value) &&
            value.url.length > 0 &&
            ((dataType === dataTypes.trend && value.showToolTip) ||
              dataType === dataTypes.geographic)
          ) {
            allUrls.push(...value.url);
          }
        });
      });

      return Array.from(new Set(allUrls));
    },
    [dataType],
  );

  /**
   * Extracts and highlights prompts from trend or geographic data.
   *
   * @param data - An array of trend or geographic items.
   *
   * @returns void
   */
  const extractHighlightedPrompts = useCallback(
    (data: TrendItem[] | GeographicItem[]) => {
      const highlightedPrompts: HighlightedPromptItem[] = data.reduce(
        (acc: HighlightedPromptItem[], item) => {
          Object.entries(item).forEach(([key, value]) => {
            if (
              isPromptKey(key) &&
              isPromptItem(value) &&
              value.url.length > 0
            ) {
              const highlightPrompt: HighlightedPromptItem = {
                url: value.url,
                value: value.value,
                promptKey: key,
              };

              if (dataType === dataTypes.trend && value.showToolTip) {
                highlightPrompt.letter = value.showToolTip;
                acc.push(highlightPrompt);
              } else if (dataType === dataTypes.geographic) {
                acc.push(highlightPrompt);
              }
            }
          });
          return acc;
        },
        [],
      );

      setHighlightedPromptItems(highlightedPrompts);
    },
    [dataType, setHighlightedPromptItems],
  );

  /**
   * Fetches and processes prompt item data for the provided trend or geographic data.
   *
   * Extracts unique URLs from the trend/geographic data, fetches prompt item data for each URL,
   * and then processes the results to create a mapping from URL to prompt item data.
   *
   * @param data - Array of trend or geographic items to process.
   *
   * @returns A record where each key is a URL and its value is the corresponding prompt item data.
   */
  return useCallback(
    async (data: TrendItem[] | GeographicItem[]) => {
      setLoadingOpenGraph(true);

      extractHighlightedPrompts(data);
      const uniqueUrls = extractUrls(data);
      const urlDetailsResponse = await retrieveUrlDetails(uniqueUrls);
      const [urlData, error] = urlDetailsResponse as OpengraphResponse;

      setLoadingOpenGraph(false);

      if (error) {
        const snackBarParams = generateSnackBarParams(
          "error",
          error.statusCode,
          "meta",
        );

        enqueueSnackbar(snackBarParams.message, {
          key: snackBarParams.key,
          variant: snackBarParams.variant,
        });
      }

      if (urlData) {
        return urlData.reduce<Record<string, PromptItemDisplayData>>(
          (acc, curr) => {
            if (curr) {
              acc[curr.url] = curr;
            }
            return acc;
          },
          {},
        );
      }

      return {};
    },
    [extractHighlightedPrompts, extractUrls, setLoadingOpenGraph],
  );
};

export default usePrompt;
