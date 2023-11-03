export {};

declare global {
  type GeographicItem = {
    id: string;
    prompt1?: PromptItem;
    prompt2?: PromptItem;
    prompt3?: PromptItem;
    prompt4?: PromptItem;
  };

  type GeographicResult = [
    {
      prompts: string[];
    },
    {
      data: {
        regions: GeographicItem[];
        planning_areas: GeographicItem[];
      };
    },
  ];

  type GeographicResponse = [
    GeographicResult | undefined,
    ApiError | undefined,
  ];

  type GradientBarProps = {
    colors: string[];
    max?: number;
  };

  type MapSourcePreset = "regions" | "planning_areas";

  type MapTooltipItemPrompt = {
    key: PromptKey;
    value: number;
    url: string[];
  };

  type MapTooltipData = {
    coordinates: { x: number; y: number };
    noData: boolean;
    prompts?: MapTooltipItemPrompt[];
    title?: string;
  };

  type MapTooltipItem = {
    id: string;
    prompts: MapTooltipItemPrompt[];
  };

  type MapTooltipLegendProps = {
    bgColor: string;
    prompt: MapTooltipItemPrompt;
    single?: boolean;
  };

  type MapTooltipMetadata = {
    body: string | null;
    image: string | null;
    source: string | null;
  };
}
