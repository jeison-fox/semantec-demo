import AppBar from "@/components/appbar/AppBar";
import PromptTypeahead from "@/components/inputs/prompt-typeahead/PromptTypeahead";
import MainContainer from "@/components/layout/MainContainer";
import ContentSidebar from "@/components/sidebars/content-sidebar/ContentSidebar";
import SideBar from "@/components/sidebars/menu-sidebar/SideBar";
import ContentSidebarContextProvider from "@/context/ContentSidebarContextProvider";
import DataVisualizationContextProvider from "@/context/DataVisualizationContextProvider";
import DateSelectorContextProvider from "@/context/DateSelectorContextProvider";
import PromptContextProvider from "@/context/PromptContextProvider";
import UiContextProvider from "@/context/UiContextProvider";

export default function DataDisplayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <UiContextProvider>
        <DateSelectorContextProvider>
          <PromptContextProvider>
            <AppBar />
            <SideBar />
            <MainContainer>
              <div className="pt-5 px-8 pb-8 border-0 border-b border-solid border-gray-700">
                <PromptTypeahead />
              </div>
              <div className="h-content relative">
                <DataVisualizationContextProvider>
                  <ContentSidebarContextProvider>
                    {children}
                    <ContentSidebar />
                  </ContentSidebarContextProvider>
                </DataVisualizationContextProvider>
              </div>
            </MainContainer>
          </PromptContextProvider>
        </DateSelectorContextProvider>
      </UiContextProvider>
    </main>
  );
}
