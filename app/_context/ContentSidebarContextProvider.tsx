"use client";

import { useCallback, useMemo, useRef, useState } from "react";

import ContentSidebarContext from "@/context/ContentSidebarContext";

export default function ContentSidebarContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleContentSidebarVisibility = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const contentSidebarContextValue = useMemo(
    () => ({
      isContentSidebarOpen: isOpen,
      sidebarRef,
      toggleContentSidebarVisibility,
    }),
    [isOpen, toggleContentSidebarVisibility],
  );

  return (
    <ContentSidebarContext.Provider value={contentSidebarContextValue}>
      {children}
    </ContentSidebarContext.Provider>
  );
}
