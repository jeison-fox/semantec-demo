import { useContext } from "react";
import { HiMiniCog8Tooth } from "react-icons/hi2";
import { LiaLifeRingSolid } from "react-icons/lia";

import SideBarMenuItem from "@/components/sidebars/menu-sidebar/SideBarMenuItem";
import UiContext from "@/context/UiContext";

const menuItems = [
  {
    customClass: "!py-2",
    disabled: true,
    name: "Settings",
    icon: <HiMiniCog8Tooth className="w-5 h-5 text-gray-400" />,
    href: "/",
    secondary: true,
  },
  {
    customClass: "!py-2",
    disabled: true,
    name: "Help & getting started",
    icon: <LiaLifeRingSolid className="w-5 h-5 text-gray-400" />,
    href: "/",
    secondary: true,
  },
];

export default function SideBarSecondaryMenu() {
  const { menuSidebarCollapsed } = useContext(UiContext);

  return (
    <ul className="flex flex-col">
      {menuItems.map((item) => (
        <SideBarMenuItem
          key={item.name}
          compact={menuSidebarCollapsed}
          data={item}
        />
      ))}
      <li className="bg-gray-700 h-[1px] mt-4 mx-auto w-sidebar-divider" />
    </ul>
  );
}
