import { dataTypes } from "@/app/_constants/general";
import Caption from "@/components/Caption";
import GradientBarContainer from "@/components/gradient-bar/GradientBarContainer";
import MapBoxMap from "@/components/map/Map";
import MapTooltipContextProvider from "@/context/MapTooltipContextProvider";

export default function Geographic() {
  const mapboxToken = process.env.MAPBOX_PUBLIC_TOKEN;

  if (!mapboxToken) {
    throw new Error("Missing MapBox token");
  }

  return (
    <div className="flex flex-col h-full w-full">
      <MapTooltipContextProvider>
        <MapBoxMap mapboxToken={mapboxToken} />
        <GradientBarContainer />
        <Caption type={dataTypes.geographic} />
      </MapTooltipContextProvider>
    </div>
  );
}
