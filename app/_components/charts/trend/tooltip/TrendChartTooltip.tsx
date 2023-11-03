import { useContext, useEffect, useMemo, useState } from "react";
import { TooltipProps } from "recharts";

import PromptItem from "@/components/prompt-item/PromptItem";
import PromptItemSkeleton from "@/components/prompt-item/PromptItemSkeleton";
import DataVisualizationContext from "@/context/DataVisualizationContext";

export default function TrendChartTooltip({
  active,
  loading,
  payload,
  dataCache,
}: TooltipProps<number, string> & {
  loading: boolean;
  dataCache: Record<string, PromptItemDisplayData>;
}) {
  const [tooltipData, setTooltipData] = useState<PromptItemDisplayData | null>(
    null,
  );
  const { activeArea }: { activeArea: PromptKey } = useContext(
    DataVisualizationContext,
  );

  const payloadData: TrendItem = useMemo(
    () => ((payload && payload[0] && payload[0]?.payload) as TrendItem) || {},
    [payload],
  );

  const { showToolTip = null, url = [] } = (payloadData[activeArea] ||
    {}) as PromptItem;

  const shouldRender = useMemo(
    () => active && showToolTip && payload && payload.length > 0,
    [active, payload, showToolTip],
  );

  /**
   * useEffect hook to update the tooltip data.
   *
   * This effect sets the tooltip data based on the given URL's first entry.
   * It references a cache (`urlMetadataCache`) to fetch the prompt item data
   * and sets a default value of `null` if the data is not found in the cache.
   */
  useEffect(() => {
    if (url && url.length > 0) {
      setTooltipData(dataCache[url[0]] || null);
    }
  }, [setTooltipData, dataCache, url]);

  if (shouldRender) {
    return (
      <article className="bg-green-dark-jungle flex gap-x-2 px-3 py-2.5 rounded w-72">
        {loading ? (
          <PromptItemSkeleton />
        ) : (
          tooltipData && <PromptItem promptItem={tooltipData} />
        )}
      </article>
    );
  }

  return null;
}
