"use client";

import "mapbox-gl/dist/mapbox-gl.css";

import mapboxgl from "mapbox-gl";
import { useCallback, useEffect, useRef } from "react";

export default function MapBoxMap({
  mapboxToken,
}: {
  mapboxToken: string;
}): JSX.Element {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  mapboxgl.accessToken = mapboxToken;

  const addLinesLayer = useCallback((mapboxMap: mapboxgl.Map) => {
    mapboxMap.addLayer({
      id: "districts_line",
      type: "line",
      source: "districts",
      layout: {},
      paint: {
        "line-color": "#fff",
        "line-width": 2,
      },
    });
  }, []);

  const addMapSource = useCallback((mapboxMap: mapboxgl.Map) => {
    mapboxMap.addSource("districts", {
      type: "geojson",
      data: "https://raw.githubusercontent.com/jeison-fox/geojson/main/singapore_postal_districts.json",
    });
  }, []);

  const addDistrictsLayer = useCallback((mapboxMap: mapboxgl.Map) => {
    mapboxMap.addLayer({
      id: "districts",
      type: "fill",
      source: "districts",
      layout: {},
      paint: {
        "fill-color": "#0DC789",
      },
    });
  }, []);

  const handleDistrictsClick = useCallback(
    (e: mapboxgl.MapMouseEvent, mapboxMap: mapboxgl.Map) => {
      const features = mapboxMap.queryRenderedFeatures(e.point, {
        layers: ["districts"],
      });

      if (features && features.length > 0) {
        const featuredName = features[0]?.properties?.id as string;

        mapboxMap.setPaintProperty("districts", "fill-color", [
          "case",
          ["==", ["get", "id"], featuredName],
          "#2A2379",
          "#0DC789",
        ]);
      }
    },
    [],
  );

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      center: [103.8198, 1.3521],
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: 11,
    });

    map.current.on("load", () => {
      if (map.current) {
        addMapSource(map.current);
        addDistrictsLayer(map.current);
        addLinesLayer(map.current);
      }
    });

    map.current.on("click", "districts", (e: mapboxgl.MapMouseEvent) => {
      if (map.current) {
        handleDistrictsClick(e, map.current);
      }
    });
  }, [
    addDistrictsLayer,
    addLinesLayer,
    addMapSource,
    handleDistrictsClick,
    mapboxToken,
  ]);

  return (
    <div className="mapbox-map h-full rounded-xl w-full" ref={mapContainer} />
  );
}
