"use client";

import { useCallback } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

type DataPoint = {
  x: string;
  y: number;
};

type RechartsLineChartProps = {
  data: DataPoint[];
};

export default function RechartsLineChart({ data }: RechartsLineChartProps) {
  const CustomTooltip = useCallback(
    ({ active, payload, label }: TooltipProps<number, string>) => {
      const showTooltip =
        active &&
        payload &&
        payload !== undefined &&
        payload.length > 0 &&
        payload[0].value !== undefined &&
        payload[0].value > 50;

      if (showTooltip) {
        return (
          <div className="bg-[#453cb4] flex px-4 py-2 rounded-full font-bold text-sm text-white">
            <p className="mr-2">{`Date: ${label}`}</p>
            <p>{`Value: ${payload[0].value}`}</p>
          </div>
        );
      }

      return null;
    },
    [],
  );

  return (
    <div className="h-full w-full">
      <ResponsiveContainer className="h-full w-full">
        <LineChart className="w-full h-full" data={data}>
          <CartesianGrid
            stroke="#453cb4"
            strokeDasharray="0"
            strokeWidth={2}
            vertical={false}
          />
          <XAxis
            dataKey="x"
            padding={{ left: 70, right: 10 }}
            stroke="#453cb4"
            tick={{
              dy: 10,
              fill: "#F7F7F7",
              fontSize: "14px",
              fontWeight: "bold",
            }}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            tick={{
              dx: 50,
              dy: 15,
              fill: "#F7F7F7",
              fontSize: "14px",
              fontWeight: "bold",
            }}
            tickLine={false}
            ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90]}
          />
          <Tooltip content={CustomTooltip} cursor={false} />
          <Line
            activeDot={{ r: 8 }}
            dataKey="y"
            stroke="#0DC789"
            strokeWidth={3}
            type="natural"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
