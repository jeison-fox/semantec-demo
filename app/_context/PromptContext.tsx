import { createContext } from "react";

const PromptContext = createContext<PromptContext>({
  highlightedPromptItems: [],
  prompts: [],
  addPrompt: () => {},
  removePrompt: () => {},
  resetPrompts: () => {},
  setHighlightedPromptItems: () => {},
});

export default PromptContext;
