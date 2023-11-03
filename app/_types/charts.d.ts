export {};

declare global {
  type TrendChartDotProps = {
    cx: number;
    cy: number;
    dataKey: string;
    fill: string;
    index: number;
    isDotActive;
    payload: TrendItem;
    stroke: string;
  };
}
