/* eslint-disable consistent-return */
import mapboxgl from "mapbox-gl";
import { RefObject, useEffect, useRef } from "react";

const useMapboxSetup = (
  mapboxToken: string,
  mapContainer: RefObject<HTMLDivElement>,
) => {
  const map = useRef<mapboxgl.Map | null>(null);
  mapboxgl.accessToken = mapboxToken;

  /**
   * Initializes the Mapbox map instance when the component mounts and sets up necessary event listeners.
   *
   * @returns {void}
   */
  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      center: [103.8398, 1.3021],
      container: mapContainer.current,
      style: "mapbox://styles/pw-semantec/clm4ymcri028d01qi7fl864qw",
      zoom: 10.6,
    });

    return () => {
      map.current?.remove();
    };
  }, [mapContainer]);

  return map;
};

export default useMapboxSetup;
