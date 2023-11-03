import Image from "next/image";

import AppBarDateGroup from "@/components/appbar/AppBarDateGroup";
import AppBarTitle from "@/components/appbar/AppBarTitle";
import AppBarDateRange from "@/components/appbar/date-range/AppBarDateRange";
import logoTypeImage from "@/public/logotype.svg";

export default function AppBar() {
  return (
    <header className="bg-green-dark-jungle fixed flex h-appbar items-center top-0 w-full z-50">
      <div className="pl-7 pr-9 shrink-0 w-64">
        <Image
          src={logoTypeImage as string}
          alt="Semantec"
          width={310}
          height={70}
        />
      </div>
      <div className="flex grow items-center justify-between pl-8 pr-4">
        <AppBarTitle />
        <div className="flex gap-x-4">
          <AppBarDateRange />
          <AppBarDateGroup />
        </div>
      </div>
    </header>
  );
}
