import { createContext } from "react";

const MapTooltipContext = createContext<MapTooltipContext>({
  mapTooltipData: null,
  mapTooltipItems: [],
  showMapTooltip: false,
  setMapTooltipData: () => {},
  setMapTooltipItems: () => {},
  setShowMapTooltip: () => {},
});

export default MapTooltipContext;
