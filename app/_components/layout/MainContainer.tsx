"use client";

import clsx from "clsx";
import { useContext } from "react";

import UiContext from "@/context/UiContext";

export default function MainContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { menuSidebarCollapsed } = useContext(UiContext);

  return (
    <div
      className={clsx(
        "bg-gray-800 h-screen pt-appbar transition-all",
        menuSidebarCollapsed ? "ml-[102px]" : "ml-64",
      )}
    >
      {children}
    </div>
  );
}
