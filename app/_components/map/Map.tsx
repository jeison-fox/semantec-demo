"use client";

import "mapbox-gl/dist/mapbox-gl.css";

import clsx from "clsx";
import { SnackbarProvider } from "notistack";
import { useCallback, useContext, useEffect } from "react";

import MapSourceSelector from "@/components/map/MapSourceSelector";
import MapTooltip from "@/components/map/MapTooltip";
import LoadingOverlay from "@/components/overlay/LoadingOverlay";
import SnackBarActions from "@/components/SnackBarActions";
import { dataTypes } from "@/constants/general";
import ContentSidebarContext from "@/context/ContentSidebarContext";
import DataVisualizationContext from "@/context/DataVisualizationContext";
import DateSelectorContext from "@/context/DateSelectorContext";
import MapTooltipContext from "@/context/MapTooltipContext";
import PromptContext from "@/context/PromptContext";
import UiContext from "@/context/UiContext";
import useGeographic from "@/hooks/useGeographic";

export default function Map({ mapboxToken }: { mapboxToken: string }) {
  const { menuSidebarCollapsed, setPageTitle } = useContext(UiContext);
  const { dateRange } = useContext(DateSelectorContext);
  const { prompts } = useContext(PromptContext);
  const { isContentSidebarOpen } = useContext(ContentSidebarContext);
  const { loadingGeographic } = useContext(DataVisualizationContext);
  const { getGeographicData, map, mapContainer, mapSource, setMapSource } =
    useGeographic(mapboxToken);
  const { mapTooltipData, showMapTooltip } = useContext(MapTooltipContext);

  useEffect(() => {
    setPageTitle("Geographic");
  }, [setPageTitle]);

  /**
   * Retrieves geographic data based on the specified date range and prompts.
   * Triggered whenever there's a change in dateRange, getGeographicData, mapSource, or prompts.
   * Ensures both start and end dates are set and if any prompts exist before calling the data retrieval function.
   *
   * @returns {void}
   */
  useEffect(() => {
    if (dateRange.start_date && dateRange.end_date && prompts.length > 0) {
      const promptsArray = prompts.map((prompt) => prompt.value);
      void getGeographicData(dateRange, promptsArray);
    }
  }, [dateRange, getGeographicData, mapSource, prompts]);

  /**
   * Resizes the map after certain DOM changes, ensuring proper visualization.
   * This effect gets triggered whenever the 'isContentSidebarOpen' state or the 'map' reference changes.
   * Sets a delay of 150ms before resizing to cater for potential DOM update delays.
   *
   * @returns {void} A cleanup function to clear the timeout and prevent potential side effects on unmount or dependency changes.
   */
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (map.current) {
      const resizeTimer = setTimeout(() => {
        map.current?.resize();
      }, 150);

      return () => clearTimeout(resizeTimer);
    }
  }, [isContentSidebarOpen, map, menuSidebarCollapsed]);

  const memoizedSnackBarAction = useCallback(
    (key: string | number) => <SnackBarActions id={key} />,
    [],
  );

  return (
    <>
      <div
        className={clsx(
          "h-full pt-8 pl-8 pb-8 transition-all",
          isContentSidebarOpen ? "mr-80" : "mr-[181px]",
        )}
      >
        <div className="flex flex-col h-full w-full">
          <div className="flex justify-between mb-8">
            <h2 className="font-semibold text-xl text-white">
              {`Top Topic by ${
                mapSource === "regions" ? "Region" : "Planning Zone"
              }`}
            </h2>
            <MapSourceSelector
              disabled={loadingGeographic}
              mapSource={mapSource}
              setMapSource={setMapSource}
            />
          </div>
          <div className="h-full relative w-full">
            <LoadingOverlay
              loading={loadingGeographic}
              empty={prompts.length === 0}
              type={dataTypes.geographic}
            />
            <div className="mapbox-map h-full w-full" ref={mapContainer} />
          </div>
        </div>
      </div>
      {mapTooltipData && showMapTooltip && <MapTooltip />}
      <SnackbarProvider
        action={memoizedSnackBarAction}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        autoHideDuration={7000}
        preventDuplicate
      />
    </>
  );
}
