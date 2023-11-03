"use client";

import { useCallback, useMemo, useState } from "react";

import DataVisualizationContext from "@/context/DataVisualizationContext";

export default function DataVisualizationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeArea, setActiveArea] = useState<PromptKey>("prompt1");
  const [geographicData, setGeographicData] = useState<
    GeographicItem[] | undefined
  >([]);
  const [loadingGeographic, setLoadingGeographic] = useState<boolean>(false);
  const [loadingOpenGraph, setLoadingOpenGraph] = useState<boolean>(false);
  const [loadingTrends, setLoadingTrends] = useState<boolean>(false);
  const [trendsAverages, setTrendsAverages] = useState<number[] | undefined>(
    [],
  );
  const [trendsData, setTrendsData] = useState<TrendItem[] | undefined>([]);
  const [urlMetadataCache, setUrlMetadataCache] = useState<
    Record<string, PromptItemDisplayData>
  >({});

  const updateActiveArea = useCallback((areaKey: PromptKey) => {
    setActiveArea(areaKey);
  }, []);

  const updateGeographicData = useCallback(
    (data: GeographicItem[] | undefined) => {
      setGeographicData(data);
    },
    [],
  );

  const updateLoadingGeographic = useCallback((loading: boolean) => {
    setLoadingGeographic(loading);
  }, []);

  const updateLoadingOpenGraph = useCallback((loading: boolean) => {
    setLoadingOpenGraph(loading);
  }, []);

  const updateLoadingTrends = useCallback((loading: boolean) => {
    setLoadingTrends(loading);
  }, []);

  const updateTrendsAverages = useCallback((data: number[] | undefined) => {
    setTrendsAverages(data);
  }, []);

  const updateTrendsData = useCallback((data: TrendItem[] | undefined) => {
    setTrendsData(data);
  }, []);

  const updateUrlMetadataCache = useCallback(
    (promptCache: Record<string, PromptItemDisplayData>) => {
      setUrlMetadataCache(promptCache);
    },
    [],
  );

  const trendContextValue = useMemo(
    () => ({
      activeArea,
      geographicData,
      loadingGeographic,
      loadingOpenGraph,
      loadingTrends,
      urlMetadataCache,
      trendsAverages,
      trendsData,
      setActiveArea: updateActiveArea,
      setGeographicData: updateGeographicData,
      setLoadingGeographic: updateLoadingGeographic,
      setLoadingTrends: updateLoadingTrends,
      setLoadingOpenGraph: updateLoadingOpenGraph,
      setTrendsAverages: updateTrendsAverages,
      setTrendsData: updateTrendsData,
      setUrlMetadataCache: updateUrlMetadataCache,
    }),
    [
      activeArea,
      geographicData,
      loadingGeographic,
      loadingOpenGraph,
      loadingTrends,
      trendsAverages,
      trendsData,
      urlMetadataCache,
      updateActiveArea,
      updateGeographicData,
      updateLoadingGeographic,
      updateLoadingTrends,
      updateLoadingOpenGraph,
      updateTrendsAverages,
      updateTrendsData,
      updateUrlMetadataCache,
    ],
  );

  return (
    <DataVisualizationContext.Provider value={trendContextValue}>
      {children}
    </DataVisualizationContext.Provider>
  );
}
