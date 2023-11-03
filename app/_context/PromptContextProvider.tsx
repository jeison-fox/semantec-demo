"use client";

import { useCallback, useMemo, useState } from "react";

import PromptContext from "@/context/PromptContext";

export default function PromptContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [highlightedPromptItems, setHighlightedPromptItems] = useState<
    HighlightedPromptItem[]
  >([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  const addPrompt = useCallback(
    (newPrompts: Prompt) => {
      setPrompts([...prompts, newPrompts]);
    },
    [prompts],
  );

  const removePrompt = useCallback(
    (promptId: string) => {
      const filteredPrompts = prompts.filter(
        (prompt) => prompt.id !== promptId,
      );
      setPrompts(filteredPrompts);
    },
    [prompts],
  );

  const resetPrompts = useCallback(() => {
    setPrompts([]);
  }, []);

  const promptContextValue = useMemo(
    () => ({
      highlightedPromptItems,
      prompts,
      addPrompt,
      removePrompt,
      resetPrompts,
      setHighlightedPromptItems,
    }),
    [
      highlightedPromptItems,
      prompts,
      addPrompt,
      removePrompt,
      resetPrompts,
      setHighlightedPromptItems,
    ],
  );

  return (
    <PromptContext.Provider value={promptContextValue}>
      {children}
    </PromptContext.Provider>
  );
}
