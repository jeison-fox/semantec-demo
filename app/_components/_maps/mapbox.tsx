"use client";

import { useCallback, useEffect, useRef } from "react";
import mapboxgl, { MapMouseEvent } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MapBoxMap({
  mapboxToken,
}: {
  mapboxToken: string;
}): JSX.Element {
  const mapContainer = useRef(null);
  const map = useRef(null);

  mapboxgl.accessToken = mapboxToken;

  const addLinesLayer = useCallback((map: mapboxgl.Map) => {
    map.addLayer({
      id: "districts_line",
      type: "line",
      source: "districts",
      layout: {},
      paint: {
        "line-color": "#fff",
        "line-opacity": 0.5,
        "line-width": 1,
      },
    });
  }, []);

  const addMapSource = useCallback((map: mapboxgl.Map) => {
    map.addSource("districts", {
      type: "geojson",
      data: "https://raw.githubusercontent.com/jeison-fox/geojson/main/singapore_postal_districts.json",
    });
  }, []);

  const addDistrictsLayer = useCallback((map: mapboxgl.Map) => {
    map.addLayer({
      id: "districts",
      type: "fill",
      source: "districts",
      layout: {},
      paint: {
        "fill-color": "#088",
        "fill-opacity": 0.8,
      },
    });
  }, []);

  const handleDistrictsClick = useCallback(
    (e: mapboxgl.MapMouseEvent, map: mapboxgl.Map) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["districts"],
      });

      if (features.length > 0) {
        const featuredName = features[0].properties.id;

        map.setPaintProperty("districts", "fill-color", [
          "case",
          ["==", ["get", "id"], featuredName],
          "#f00",
          "#088",
        ]);
      }
    },
    []
  );

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      center: [103.8198, 1.3521],
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: 9,
    });

    map.current.on("load", () => {
      addMapSource(map.current);
      addDistrictsLayer(map.current);
      addLinesLayer(map.current);
    });

    map.current.on("click", "districts", (e: mapboxgl.MapMouseEvent) => {
      handleDistrictsClick(e, map.current);
    });
  }, [
    addDistrictsLayer,
    addLinesLayer,
    addMapSource,
    handleDistrictsClick,
    mapboxToken,
  ]);

  return (
    <div className="py-10">
      <div
        className="mapbox-map h-[500px] mx-auto shrink-0 w-11/12"
        ref={mapContainer}
      />
    </div>
  );
}
