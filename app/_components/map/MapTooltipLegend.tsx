export default function MapTooltipLegend({
  bgColor,
  prompt,
  single = false,
}: MapTooltipLegendProps) {
  return (
    <div className="flex items-center text-left">
      <span
        className="inline-block h-4 mr-1.5 rounded w-4"
        style={{
          backgroundColor: bgColor,
        }}
      />
      <span className="text-xs text-gray-400">
        {prompt.value}
        {single ? null : "%"}
      </span>
    </div>
  );
}
