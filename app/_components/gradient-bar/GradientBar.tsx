import clsx from "clsx";

export default function GradientBar({
  colors = [],
  max = 100,
}: GradientBarProps) {
  const gradientStr = `linear-gradient(to right, ${colors.join(", ")})`;

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full flex justify-between">
        {colors.map((color, index) => (
          <div
            key={color}
            className={clsx("h-0.5 w-[1px] bg-gray-700", {
              "opacity-0": index === 0 || index === colors.length - 1,
            })}
          />
        ))}
      </div>
      <div className="flex gap-x-4 items-center">
        <span className="font-medium text-gray-400 text-xs">0</span>
        <div
          className="w-full h-1 mt-1 rounded-full"
          style={{ backgroundImage: gradientStr }}
        />
        <span className="font-medium text-gray-400 text-xs">{max}</span>
      </div>
    </div>
  );
}
