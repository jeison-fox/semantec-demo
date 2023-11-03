export {};

declare global {
  type Prompt = {
    id: string;
    value: string;
  };

  type PromptChipProps = {
    chip: Prompt;
    index?: number;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    single?: boolean;
  };

  type PromptKey = "prompt1" | "prompt2" | "prompt3" | "prompt4";

  type PromptColors = {
    prompt1: string;
    prompt2: string;
    prompt3: string;
    prompt4: string;
    [key: string]: string;
  };

  type PromptColorKey = keyof typeof PromptColors;

  type PromptItem = {
    showToolTip?: string | null;
    url: string[];
    value: number;
  };

  type HighlightedPromptItem = {
    letter?: string;
    promptKey: PromptKey;
    value: number;
    url: string[];
  };

  type PromptItemDisplayData = {
    image: string | null;
    source: string;
    title: string;
    url: string;
  };
}
