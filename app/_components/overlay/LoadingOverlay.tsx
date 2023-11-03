import clsx from "clsx";

import LoadingOverlayContent from "@/components/overlay/LoadingOverlayContent";

export default function LoadingOverlay({
  empty,
  loading,
  type,
}: {
  empty: boolean;
  loading: boolean;
  type: "trend" | "geographic";
}) {
  const overlayClasses = clsx(
    "absolute flex items-center h-full inset-0 justify-center transition-all w-overlay z-[1]",
    { "backdrop-blur-sm": loading },
    { "opacity-0 pointer-events-none": !empty && !loading },
  );

  const innerOverlayClasses = clsx(
    "absolute h-full inset-0 w-full transition-all",
    { "bg-gray-800": empty },
    { "bg-gray-800 opacity-20": loading },
  );

  return (
    <div className={overlayClasses}>
      <div className={innerOverlayClasses} />
      <LoadingOverlayContent loading={loading} type={type} />
    </div>
  );
}
