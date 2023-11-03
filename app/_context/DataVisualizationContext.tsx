import { createContext } from "react";

const DataVisualizationContext = createContext<DataVisualizationContext>({
  activeArea: "prompt1",
  geographicData: [],
  loadingGeographic: false,
  loadingOpenGraph: false,
  loadingTrends: false,
  trendsAverages: [],
  trendsData: [],
  urlMetadataCache: {},
  setActiveArea: () => {},
  setGeographicData: () => {},
  setLoadingGeographic: () => {},
  setLoadingOpenGraph: () => {},
  setLoadingTrends: () => {},
  setTrendsAverages: () => {},
  setTrendsData: () => {},
  setUrlMetadataCache: () => {},
});

export default DataVisualizationContext;
