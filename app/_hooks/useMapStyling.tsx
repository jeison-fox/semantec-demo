import { RefObject, useCallback, useContext, useEffect } from "react";

import {
  gradientsArray,
  multiplePromptRange,
  singlePromptGradientColors,
  singlePromptRange,
} from "@/constants/colors";
import { mapSources } from "@/constants/general";
import PromptContext from "@/context/PromptContext";
import interpolateColor from "@/utils/color";
import { isPromptItem, isPromptKey } from "@/utils/prompt";

const useMapStyling = (
  map: RefObject<mapboxgl.Map>,
  geographicData: GeographicItem[] | undefined,
  mapSource: MapSourcePreset,
) => {
  const { prompts } = useContext(PromptContext);

  /**
   * Returns a color from a gradient array based on the given value.
   *
   * @param {number} value - A value which determines the color pick from the gradient array.
   * When 'single' is false, the value should be between 0 to 100.
   * When 'single' is true, the value should be between 0 to 5.
   * @param {string[]} gradientArray - An array of colors representing the gradient.
   * @param {boolean} single - A boolean value indicating whether the gradient array is a single prompt gradient.
   *
   * @returns {string} - A color from the gradient array based on the given value.
   */
  const getColorFromGradient = useCallback(
    (
      value: number,
      gradientArray: string[],
      single: boolean = false,
    ): string => {
      const range = single ? singlePromptRange : multiplePromptRange;
      return interpolateColor(value, range, gradientArray);
    },
    [],
  );

  /**
   * Extracts and returns prompt values from a given geographic item.
   *
   * @param {GeographicItem} geoItem - The geographic item from which prompt values are to be extracted.
   *
   * @returns {number[]} - An array of prompt values extracted from the provided geographic item.
   */
  const getGeographicItemPromptValues = useCallback(
    (geoItem: GeographicItem) => {
      const values: number[] = [];

      Object.entries(geoItem).forEach(([key, value]) => {
        if (isPromptKey(key) && isPromptItem(value)) {
          values.push(value.value);
        }
      });

      return values;
    },
    [],
  );

  /**
   * Identifies and returns the index of the highest value from an array of prompt values.
   *
   * @param {number[]} promptValues - An array of numerical prompt values.
   *
   * @returns {number} - The index of the highest value in the promptValues array.
   */
  const getHighestPromptIndex = useCallback((promptValues: number[]) => {
    return promptValues.indexOf(Math.max(...promptValues));
  }, []);

  /**
   * Generates a fill color expression for geographic items based on their prompt values.
   *
   * @param {GeographicItem[] | undefined} data - Array of geographic items for which the fill color expression is generated.
   *
   * @returns {string[]} - An array representing the fill color expression based on geographic item prompt values.
   */
  const generateFillColorExpression = useCallback(
    (data: GeographicItem[] | undefined): (string | string[])[] | string => {
      const fillColorExpression = ["match", ["get", "id"]];

      if (data) {
        data.forEach((geoItem: GeographicItem) => {
          const promptValues = getGeographicItemPromptValues(geoItem);
          const highestValueIndex = getHighestPromptIndex(promptValues);
          const highestValue = promptValues[highestValueIndex];
          const color =
            prompts.length === 1
              ? getColorFromGradient(
                  highestValue,
                  singlePromptGradientColors,
                  true,
                )
              : getColorFromGradient(
                  highestValue,
                  gradientsArray[highestValueIndex],
                );

          fillColorExpression.push(geoItem.id, color);
        });
      }

      fillColorExpression.push("#374151");
      return fillColorExpression;
    },
    [
      getColorFromGradient,
      getGeographicItemPromptValues,
      getHighestPromptIndex,
      prompts,
    ],
  );

  /**
   * Adds a layer to the Mapbox map instance to visualize geographical divisions.
   *
   * @param {mapboxgl.Map} mapboxMap - The Mapbox map instance to which the layer will be added.
   *
   * @returns {void}
   */
  const addDivisionLayer = useCallback(
    (mapboxMap: mapboxgl.Map) => {
      const fillColorExpression =
        geographicData && geographicData.length > 0
          ? generateFillColorExpression(geographicData)
          : "#1F2937";

      mapboxMap.addLayer({
        id: "geo_divisions",
        type: "fill",
        source: "geo",
        layout: {},
        paint: {
          "fill-color": fillColorExpression as
            | mapboxgl.StyleFunction
            | mapboxgl.Expression,
        },
      });
    },
    [generateFillColorExpression, geographicData],
  );

  /**
   * Adds a layer to the Mapbox map instance to display geographical lines.
   *
   * @param {mapboxgl.Map} mapboxMap - The Mapbox map instance to which the layer will be added.
   *
   * @returns {void}
   */
  const addLinesLayer = useCallback((mapboxMap: mapboxgl.Map) => {
    mapboxMap.addLayer({
      id: "geo_lines",
      type: "line",
      source: "geo",
      layout: {},
      paint: {
        "line-color": "#1f2937",
        "line-width": 3,
      },
    });
  }, []);

  /**
   * Adds a geojson source to the provided Mapbox map instance.
   *
   * @param {mapboxgl.Map} mapboxMap - The Mapbox map instance to which the source will be added.
   * @param {MapSourcePreset} source - The selected source preset.
   *
   * @returns {void}
   */
  const addMapSource = useCallback(
    (mapboxMap: mapboxgl.Map, source: MapSourcePreset) => {
      mapboxMap.addSource("geo", {
        type: "geojson",
        data: mapSources[source],
      });
    },
    [],
  );

  /**
   * Callback function to handle the loading of the geo source on the map.
   * If the geo source is loaded, it calls `addDivisionLayer` and `addLinesLayer`
   * to add respective layers to the map. If the geo source is not loaded,
   * it sets up a one-time event listener for the `sourcedata` event to
   * check again once source data is available.
   *
   * @param {mapboxgl.Map} mapboxMap - The Mapbox map instance.
   *
   * @returns {void}
   */
  const onSourceLoad = useCallback(
    (mapboxMap: mapboxgl.Map) => {
      if (mapboxMap.isSourceLoaded("geo")) {
        addDivisionLayer(mapboxMap);
        addLinesLayer(mapboxMap);
      } else {
        mapboxMap.once("sourcedata", () => onSourceLoad(mapboxMap));
      }
    },
    [addDivisionLayer, addLinesLayer],
  );

  /**
   * Updates the map layers and source when the mapSource changes.
   *
   * If the 'geo_divisions' layer already exists on the map, it removes the 'geo_divisions', 'geo_lines'
   * layers and the 'geo' source to ensure there are no conflicts or overlaps with the new data source and layers.
   *
   * @returns {void}
   */
  useEffect(() => {
    if (
      map.current &&
      map.current.isStyleLoaded() &&
      geographicData &&
      geographicData.length > 0
    ) {
      if (map.current.getLayer("geo_divisions")) {
        map.current.removeLayer("geo_divisions");
        map.current.removeLayer("geo_lines");
        map.current.removeSource("geo");
      }

      addMapSource(map.current, mapSource);
      onSourceLoad(map.current);
    }
  }, [addMapSource, geographicData, map, mapSource, onSourceLoad]);

  return { addDivisionLayer, addLinesLayer, addMapSource };
};

export default useMapStyling;
