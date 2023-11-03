import TrendChartDot from "@/components/charts/trend/dots/TrendChartDot";

export default function TrendChartActiveDot({
  cx,
  cy,
  dataKey,
  fill,
  index,
  payload,
  stroke,
}: TrendChartDotProps) {
  return (
    <TrendChartDot
      cx={cx}
      cy={cy}
      dataKey={dataKey}
      fill={fill}
      index={index}
      payload={payload}
      stroke={stroke}
      isDotActive
    />
  );
}
