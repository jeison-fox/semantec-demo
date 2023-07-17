import MapBoxMap from "@/components/maps/mapbox";

export default function Map(): JSX.Element {
  const mapboxToken = process.env.MAPBOX_PUBLIC_TOKEN;

  if (!mapboxToken) {
    throw new Error("Missing MapBox token");
  }

  return <MapBoxMap mapboxToken={mapboxToken} />;
}
