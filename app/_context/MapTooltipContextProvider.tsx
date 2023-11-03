"use client";

import { useMemo, useState } from "react";

import MapTooltipContext from "@/context/MapTooltipContext";

export default function MapTooltipContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showMapTooltip, setShowMapTooltip] = useState<boolean>(false);
  const [mapTooltipData, setMapTooltipData] = useState<MapTooltipData | null>(
    null,
  );
  const [mapTooltipItems, setMapTooltipItems] = useState<MapTooltipItem[]>([]);

  const mapTooltipContextValue = useMemo(
    () => ({
      mapTooltipData,
      mapTooltipItems,
      showMapTooltip,
      setMapTooltipData,
      setMapTooltipItems,
      setShowMapTooltip,
    }),
    [mapTooltipData, mapTooltipItems, showMapTooltip],
  );

  return (
    <MapTooltipContext.Provider value={mapTooltipContextValue}>
      {children}
    </MapTooltipContext.Provider>
  );
}
