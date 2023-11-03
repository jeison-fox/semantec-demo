import { useContext, useEffect, useRef, useState } from "react";

import DataVisualizationContext from "@/context/DataVisualizationContext";
import useGeoData from "@/hooks/useGeoData";
import useMapboxSetup from "@/hooks/useMapboxSetup";
import useMapStyling from "@/hooks/useMapStyling";
import useMapTooltip from "@/hooks/useMapTooltip";

const useGeographic = (mapboxToken: string) => {
  const { geographicData } = useContext(DataVisualizationContext);
  const [mapSource, setMapSource] = useState<MapSourcePreset>("regions");
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useMapboxSetup(mapboxToken, mapContainer);
  const getGeographicData = useGeoData(mapSource);
  const { addDivisionLayer, addLinesLayer, addMapSource } = useMapStyling(
    map,
    geographicData,
    mapSource,
  );
  const { displayMapTooltip, hideMapTooltip } = useMapTooltip();

  /**
   * Initializes the Mapbox map instance when the component mounts and sets up necessary event listeners.
   *
   * @returns {void}
   */
  useEffect(() => {
    if (map.current) {
      map.current.on("load", () => {
        if (map.current && map.current.isStyleLoaded()) {
          addMapSource(map.current, mapSource);
          addDivisionLayer(map.current);
          addLinesLayer(map.current);
        }
      });

      map.current.on(
        "mousemove",
        "geo_divisions",
        (event: mapboxgl.MapLayerMouseEvent) => {
          map.current!.getCanvas().style.cursor = "pointer";
          displayMapTooltip(event);
        },
      );

      map.current.on("mouseleave", "geo_divisions", () => {
        map.current!.getCanvas().style.cursor = "";
        hideMapTooltip();
      });
    }
  }, [
    addDivisionLayer,
    addLinesLayer,
    addMapSource,
    displayMapTooltip,
    hideMapTooltip,
    map,
    mapSource,
    mapboxToken,
  ]);

  return { getGeographicData, map, mapContainer, mapSource, setMapSource };
};

export default useGeographic;
