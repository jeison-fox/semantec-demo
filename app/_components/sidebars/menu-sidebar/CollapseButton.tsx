"use client";

import clsx from "clsx";
import { useContext } from "react";
import { FaChevronLeft } from "react-icons/fa";

import UiContext from "@/context/UiContext";

export default function CollasepButton() {
  const { menuSidebarCollapsed, setMenuSidebarCollapsed } =
    useContext(UiContext);

  /**
   * Handles the click event to toggle the state of `menuSidebarCollapsed`.
   */
  const handleClick = () => {
    setMenuSidebarCollapsed(!menuSidebarCollapsed);
  };

  return (
    <button
      className={clsx(
        "flex px-7 w-full transition-all group",
        menuSidebarCollapsed ? "justify-center" : "justify-end",
      )}
      onClick={handleClick}
    >
      <FaChevronLeft
        className={clsx(
          "text-2xl text-gray-500 transition-transform group-hover:text-gray-400",
          {
            "rotate-180": menuSidebarCollapsed,
          },
        )}
      />
    </button>
  );
}
