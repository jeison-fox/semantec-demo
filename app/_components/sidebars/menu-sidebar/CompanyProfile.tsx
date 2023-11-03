import clsx from "clsx";
import Image from "next/image";
import { useContext } from "react";

import UiContext from "@/context/UiContext";
import AvatarImage from "@/public/074m.jpg";

export default function CompanyProfile() {
  const { menuSidebarCollapsed } = useContext(UiContext);

  return (
    <div
      className={clsx("flex gap-x-2 items-center px-5", {
        "justify-center": menuSidebarCollapsed,
      })}
    >
      <Image
        src={AvatarImage}
        width="32"
        height="32"
        alt="Company Profile"
        className="rounded"
      />
      {!menuSidebarCollapsed && (
        <p className="font-semibold m-0 text-base text-white break-all">
          John Doe
        </p>
      )}
    </div>
  );
}
