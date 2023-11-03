export {};

declare global {
  type ContentSidebarContext = {
    isContentSidebarOpen: boolean;
    sidebarRef: React.RefObject<HTMLDivElement> | null;
    toggleContentSidebarVisibility: () => void;
  };

  type DataVisualizationContext = {
    activeArea: PromptKey;
    geographicData: GeographicItem[] | undefined;
    loadingGeographic: boolean;
    loadingTrends: boolean;
    loadingOpenGraph: boolean;
    trendsAverages: number[] | undefined;
    trendsData: TrendItem[] | undefined;
    urlMetadataCache: Record<string, PromptItemDisplayData>;
    setActiveArea: (areaKey: PromptKey) => void;
    setGeographicData: (geographicData: GeographicItem[] | undefined) => void;
    setLoadingGeographic: (loading: boolean) => void;
    setLoadingTrends: (loading: boolean) => void;
    setLoadingOpenGraph: (loading: boolean) => void;
    setTrendsAverages: (trendsAverages: number[] | undefined) => void;
    setTrendsData: (trendsData: TrendItem[] | undefined) => void;
    setUrlMetadataCache: (
      urlMetadataCache: Record<string, PromptItemDisplayData>,
    ) => void;
  };

  type DateSelectorContext = {
    dateRange: DateRange;
    datePreset: DateRangePreset;
    setDateRange: (dateRange: DateRange) => void;
    setDatePreset: (datePreset: DateRangePreset) => void;
  };

  type MapTooltipContext = {
    mapTooltipData: MapTooltipData | null;
    mapTooltipItems: MapTooltipItem[];
    showMapTooltip: boolean;
    setMapTooltipData: (mapTooltipData: MapTooltipData | null) => void;
    setMapTooltipItems: (mapTooltipItems: MapTooltipItem[]) => void;
    setShowMapTooltip: (showMapTooltip: boolean) => void;
  };

  type PromptContext = {
    highlightedPromptItems: HighlightedPromptItem[];
    prompts: Prompt[];
    addPrompt: (prompt: Prompt) => void;
    removePrompt: (promptId: string) => void;
    resetPrompts: () => void;
    setHighlightedPromptItems: (
      highlightedPromptItems: HighlightedPromptItem[],
    ) => void;
  };

  type UiContext = {
    menuSidebarCollapsed: boolean;
    pageTitle: string;
    setMenuSidebarCollapsed: (menuSidebarCollapsed: boolean) => void;
    setPageTitle: (pageTitle: string) => void;
  };
}
