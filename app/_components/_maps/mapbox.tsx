"use client";

import { useCallback, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { EventData, GeoJSONSource, Layer, Map } from "@types/mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MapBoxMap({
  mapboxToken,
}: {
  mapboxToken: string;
}): JSX.Element {
  const mapContainer = useRef<HTMLElement | null>(null);
  const map = useRef<Map | null>(null);

  mapboxgl.accessToken = mapboxToken;

  const addLinesLayer = useCallback((map: Map) => {
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
    } as Layer);
  }, []);

  const addMapSource = useCallback((map: Map) => {
    map.addSource("districts", {
      type: "geojson",
      data: "https://raw.githubusercontent.com/jeison-fox/geojson/main/singapore_postal_districts.json",
    } as GeoJSONSource);
  }, []);

  const addDistrictsLayer = useCallback((map: Map) => {
    map.addLayer({
      id: "districts",
      type: "fill",
      source: "districts",
      layout: {},
      paint: {
        "fill-color": "#088",
        "fill-opacity": 0.8,
      },
    } as Layer);
  }, []);

  const handleDistrictsClick = useCallback((e: EventData, map: Map) => {
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
  }, []);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      center: [103.8198, 1.3521],
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: 9,
    });

    map.current.on("load", () => {
      addMapSource(map.current as Map);
      addDistrictsLayer(map.current as Map);
      addLinesLayer(map.current as Map);
    });

    map.current.on("click", "districts", (e: EventData) => {
      handleDistrictsClick(e, map.current as Map);
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
