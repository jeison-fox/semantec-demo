"use client";

import { useMemo, useState } from "react";

import UiContext from "@/context/UiContext";

export default function UiContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuSidebarCollapsed, setMenuSidebarCollapsed] =
    useState<boolean>(false);
  const [pageTitle, setPageTitle] = useState<string>("");

  const UiContextValue = useMemo(
    () => ({
      menuSidebarCollapsed,
      pageTitle,
      setMenuSidebarCollapsed,
      setPageTitle,
    }),
    [menuSidebarCollapsed, pageTitle],
  );

  return (
    <UiContext.Provider value={UiContextValue}>{children}</UiContext.Provider>
  );
}
