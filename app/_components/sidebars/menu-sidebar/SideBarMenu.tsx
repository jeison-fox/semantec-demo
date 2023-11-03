import { useContext } from "react";
import { BiLineChart } from "react-icons/bi";
import { FaGlobeAsia } from "react-icons/fa";

import SideBarMenuItem from "@/components/sidebars/menu-sidebar/SideBarMenuItem";
import routes from "@/constants/routes";
import UiContext from "@/context/UiContext";

const menuItems = [
  {
    name: "Trends",
    icon: <BiLineChart className="w-5 h-5 text-gray-400" />,
    href: routes.trends,
  },
  {
    name: "Geographic",
    icon: <FaGlobeAsia className="w-5 h-5 text-gray-400" />,
    href: routes.geographic,
  },
];

export default function SideBarMenu() {
  const { menuSidebarCollapsed } = useContext(UiContext);

  return (
    <ul className="flex flex-col gap-y-3">
      {menuItems.map((item) => (
        <SideBarMenuItem
          key={item.name}
          compact={menuSidebarCollapsed}
          data={item}
        />
      ))}
      <li className="bg-gray-700 h-[1px] mt-5 mx-auto w-sidebar-divider" />
    </ul>
  );
}
