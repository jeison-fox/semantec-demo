"use client";

import clsx from "clsx";
import { format, parseISO } from "date-fns";
import { SnackbarProvider } from "notistack";
import { useCallback, useContext, useEffect, useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Caption from "@/components/Caption";
import TrendChartActiveDot from "@/components/charts/trend/dots/TrendChartActiveDot";
import TrendChartDot from "@/components/charts/trend/dots/TrendChartDot";
import TrendChartTooltip from "@/components/charts/trend/tooltip/TrendChartTooltip";
import LoadingOverlay from "@/components/overlay/LoadingOverlay";
import SnackBarActions from "@/components/SnackBarActions";
import { promptColors } from "@/constants/colors";
import { dataTypes } from "@/constants/general";
import ContentSidebarContext from "@/context/ContentSidebarContext";
import DataVisualizationContext from "@/context/DataVisualizationContext";
import DateSelectorContext from "@/context/DateSelectorContext";
import PromptContext from "@/context/PromptContext";
import UiContext from "@/context/UiContext";
import useTrends from "@/hooks/useTrends";
import { getPromptColorByIndex } from "@/utils/prompt";

export default function TrendChart() {
  const { setPageTitle } = useContext(UiContext);
  const { dateRange } = useContext(DateSelectorContext);
  const { prompts } = useContext(PromptContext);
  const { isContentSidebarOpen } = useContext(ContentSidebarContext);
  const {
    loadingTrends,
    loadingOpenGraph,
    trendsAverages,
    trendsData,
    urlMetadataCache,
  } = useContext(DataVisualizationContext);
  const getTrendsData = useTrends();

  const promptColorKeys = useMemo(() => Object.keys(promptColors), []);

  useEffect(() => {
    setPageTitle("Trends");
  }, [setPageTitle]);

  useEffect(() => {
    if (dateRange.start_date && dateRange.end_date && prompts.length > 0) {
      const promptsArray = prompts.map((prompt) => prompt.value);
      void getTrendsData(dateRange, promptsArray);
    }
  }, [dateRange, getTrendsData, prompts]);

  const memoizedSnackBarAction = useCallback(
    (key: string | number) => <SnackBarActions id={key} />,
    [],
  );

  /**
   * Renders a dot on the Trend Chart.
   *
   * @param {TrendChartDotProps} props - The properties required to render a dot on the chart.
   *
   * @returns {JSX.Element} - A React element representing the rendered dot.
   */
  const renderTrendChartDot = useCallback(
    (props: TrendChartDotProps) => (
      <TrendChartDot
        cx={props.cx}
        cy={props.cy}
        dataKey={props.dataKey}
        fill={props.fill}
        index={props.index}
        isDotActive={false}
        payload={props.payload}
        stroke={props.stroke}
      />
    ),
    [],
  );

  /**
   * Renders an active dot on the Trend Chart.
   *
   * @param {TrendChartDotProps} props - The properties required to render an active dot on the chart.
   *
   * @returns {JSX.Element} - A React element representing the rendered active dot.
   */
  const renderTrendChartActiveDot = useCallback(
    (props: TrendChartDotProps) => (
      <TrendChartActiveDot
        cx={props.cx}
        cy={props.cy}
        dataKey={props.dataKey}
        fill={props.fill}
        index={props.index}
        isDotActive
        payload={props.payload}
        stroke={props.stroke}
      />
    ),
    [],
  );

  /**
   * Renders an array of Area components for the Trend Chart.
   *
   * @param {string[]} promptColorKeys - Array of keys representing the colors for each prompt.
   * @param {Function} renderTrendChartDot - Function to render the dots for the trend chart.
   * @param {Function} renderTrendChartActiveDot - Function to render the active dots for the trend chart.
   *
   * @returns {JSX.Element[]} - An array of React Area components for the Trend Chart.
   */
  const renderedAreas = useMemo(
    () =>
      promptColorKeys.map((promptKey) => (
        <Area
          className="pointer-events-none"
          key={promptKey}
          type="linear"
          dataKey={`${promptKey}.value`}
          stroke={promptColors[promptKey]}
          strokeWidth={4}
          fill={`url(#gradient-${promptKey})`}
          dot={renderTrendChartDot}
          activeDot={renderTrendChartActiveDot}
        />
      )),
    [promptColorKeys, renderTrendChartDot, renderTrendChartActiveDot],
  );

  /**
   * Renders an array of ReferenceLine components for the Trend Chart.
   *
   * @param {number[]} trendsAverages - Array of average values to be represented as reference lines on the chart.
   * @param {Function} getPromptColorByIndex - Function to fetch the color associated with a given index.
   *
   * @returns {JSX.Element[]} - An array of React ReferenceLine components for the Trend Chart.
   */
  const renderedReferenceLines = useMemo(() => {
    if (!trendsAverages) {
      return null;
    }

    return trendsAverages.map((avgValue, index) => (
      <ReferenceLine
        key={`${avgValue}-${Date.now()}`}
        y={avgValue}
        stroke={getPromptColorByIndex(index)}
        strokeDasharray="6"
        strokeWidth={1}
      />
    ));
  }, [trendsAverages]);

  return (
    <div
      className={clsx(
        "h-full relative transition-all",
        isContentSidebarOpen ? "mr-80" : "mr-20",
      )}
    >
      <LoadingOverlay
        loading={loadingTrends}
        empty={prompts.length === 0}
        type={dataTypes.trend}
      />
      <div className="h-[430px] pt-[104px]">
        <ResponsiveContainer>
          <AreaChart
            className="w-full h-full"
            data={trendsData}
            margin={{ top: 14, right: 14, left: 0, bottom: 0 }}
          >
            <XAxis
              axisLine={false}
              dataKey="date"
              padding={{ left: 20 }}
              stroke="#453cb4"
              tick={{
                dy: 10,
                fill: "#9CA3AF",
                fontSize: "14px",
                fontWeight: "500",
              }}
              tickLine={false}
              tickFormatter={(dateStr: string) =>
                format(parseISO(dateStr), "M/d")
              }
            />
            <YAxis
              axisLine={false}
              tick={{
                fill: "#9CA3AF",
                fontSize: "14px",
                fontWeight: "500",
              }}
              tickLine={false}
            />
            <CartesianGrid
              stroke="#374151"
              strokeDasharray="6"
              strokeWidth={1}
              vertical={false}
            />
            <Tooltip
              content={
                <TrendChartTooltip
                  loading={loadingOpenGraph}
                  dataCache={urlMetadataCache}
                />
              }
              cursor={false}
            />
            {trendsAverages &&
              trendsAverages.length > 0 &&
              renderedReferenceLines}
            <defs>
              {promptColorKeys.map((promptKey) => (
                <linearGradient
                  id={`gradient-${promptKey}`}
                  key={`gradient-${promptKey}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={promptColors[promptKey]}
                    stopOpacity={1}
                  />
                  <stop
                    offset="95%"
                    stopColor={promptColors[promptKey]}
                    stopOpacity={0}
                  />
                </linearGradient>
              ))}
            </defs>
            {renderedAreas}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <Caption type={dataTypes.trend} />
      <SnackbarProvider
        action={memoizedSnackBarAction}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        autoHideDuration={7000}
        preventDuplicate
      />
    </div>
  );
}
