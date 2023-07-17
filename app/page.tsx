import Image from "next/image";

import NavLink from "@/components/links/navLink";
import chartImage from "@/public/chart.png";
import mapImage from "@/public/map.png";

export default function Home(): JSX.Element {
  return (
    <main className="h-full px-7 lg:flex lg:gap-x-20 lg:justify-center lg:py-10">
      <div className="flex flex-col justify-center mb-20 mx-auto pt-10 w-full md:w-[500px] lg:mb-0 lg:mx-0 lg:pt-0">
        <h1 className="font-bold mb-5 text-5xl text-white md:text-7xl">
          Visualize Your World
        </h1>
        <h3 className="mb-5 text-lg text-white md:text-xl lg:mb-14">
          Unveiling Data through Dynamic Maps and Charts
        </h3>
        <p className="mb-11 text-white text-sm md:text-lg lg:mb-14">
          Unlock the power of data with our dynamic visualization tool.
          Transform complex datasets into intuitive maps and charts, uncover
          patterns and trends quickly. Deciphering data has never been this easy
          or efficient. Discover, interpret, and act - all in one place.
        </p>
        <div className="flex gap-x-5">
          <NavLink data={{ href: "/map", name: "Map" }} />
          <NavLink data={{ href: "/chart", name: "Chart" }} />
        </div>
      </div>
      <div className="flex flex-col gap-y-14 lg:gap-y-28 justify-center mx-auto pb-10 shrink-0 w-full md:w-[500px] lg:mx-0 lg:pb-0">
        <Image
          src={mapImage}
          alt="Map"
          className="border border-solid shadow-map rounded-xl"
        />
        <Image
          src={chartImage}
          alt="Chart"
          className="border border-solid shadow-chart rounded-xl"
        />
      </div>
    </main>
  );
}
