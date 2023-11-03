export {};

declare global {
  type TrendItem = {
    date: string;
    prompt1?: PromptItem;
    prompt2?: PromptItem;
    prompt3?: PromptItem;
    prompt4?: PromptItem;
  };

  type TrendsResult = [
    {
      prompts: string[];
    },
    {
      data: TrendItem[];
    },
    {
      averages: number[];
    },
  ];

  type TrendsResponse = [TrendsResult | undefined, ApiError | undefined];
}
