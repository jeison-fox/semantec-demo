import { createContext } from "react";

const UiContext = createContext<UiContext>({
  menuSidebarCollapsed: false,
  pageTitle: "",
  setMenuSidebarCollapsed: () => {},
  setPageTitle: () => {},
});

export default UiContext;
