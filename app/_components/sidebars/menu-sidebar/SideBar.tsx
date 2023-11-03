"use client";

import clsx from "clsx";
import { useContext } from "react";

import CollapseButton from "@/components/sidebars/menu-sidebar/CollapseButton";
import CompanyProfile from "@/components/sidebars/menu-sidebar/CompanyProfile";
import Logout from "@/components/sidebars/menu-sidebar/Logout";
import SideBarMenu from "@/components/sidebars/menu-sidebar/SideBarMenu";
import SideBarSecondaryMenu from "@/components/sidebars/menu-sidebar/SideBarSecondaryMenu";
import UiContext from "@/context/UiContext";

export default function SideBar() {
  const { menuSidebarCollapsed } = useContext(UiContext);

  return (
    <aside
      id="logo-sidebar"
      className={clsx(
        "fixed top-0 left-0 z-40 h-screen pt-appbar transition-all",
        menuSidebarCollapsed ? "w-[102px]" : "w-64",
      )}
      aria-label="Sidebar"
    >
      <div className="flex flex-col h-full justify-between pt-4 pb-6">
        <SideBarMenu />
        <div>
          <div
            className={clsx(
              "grid grid-cols-1 mb-9",
              menuSidebarCollapsed ? "gap-y-7" : "gap-y-4",
            )}
          >
            <SideBarSecondaryMenu />
            <CompanyProfile />
            <Logout />
          </div>
          <CollapseButton />
        </div>
      </div>
    </aside>
  );
}
