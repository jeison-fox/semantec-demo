import { createContext } from "react";

const ContentSidebarContext = createContext<ContentSidebarContext>({
  isContentSidebarOpen: true,
  sidebarRef: null,
  toggleContentSidebarVisibility: () => {},
});

export default ContentSidebarContext;
