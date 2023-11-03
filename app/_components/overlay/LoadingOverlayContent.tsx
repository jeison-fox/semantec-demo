import { LuTrendingUp } from "react-icons/lu";
import { TbWorldShare } from "react-icons/tb";

import { dataTypes, loadingMessages } from "@/constants/general";

export default function LoadingOverlayContent({
  loading,
  type,
}: {
  loading: boolean;
  type: "trend" | "geographic";
}) {
  const iconClasses = "h-24 text-[#0DDE7C] w-24";

  const icon =
    type === dataTypes.trend ? (
      <LuTrendingUp className={iconClasses} />
    ) : (
      <TbWorldShare className={iconClasses} />
    );

  return (
    <div className="flex flex-col items-center gap-y-9 z-[1]">
      {icon}
      <p className="font-semibold text-xl text-white">
        {loading ? loadingMessages[type].loading : loadingMessages[type].empty}
      </p>
    </div>
  );
}
