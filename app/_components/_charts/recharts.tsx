"use client";

import { useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  TooltipProps,
  ResponsiveContainer,
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
    ({
      active,
      payload,
      label,
    }: TooltipProps<number, string>) => {
      if (active && payload && payload.length && payload[0]?.value > 50) {
        return (
          <div className="bg-[#453cb4] flex px-4 py-2 rounded-full font-bold text-sm text-white">
            <p className="mr-2">{`Date: ${label}`}</p>
            <p>{`Value: ${payload[0].value}`}</p>
          </div>
        );
      }
    },
    []
  );

  return (
    <div className="py-10">
      <div className="bg-[#29227c] h-[500px] mx-auto p-4 shrink-0 w-11/12">
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
                fill: "white",
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
                fill: "white",
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
              stroke="#34ffb5"
              strokeWidth={3}
              type="natural"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
