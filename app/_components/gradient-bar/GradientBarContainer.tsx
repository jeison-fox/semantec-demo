"use client";

import { useContext } from "react";

import GradientBar from "@/components/gradient-bar/GradientBar";
import { gradientsArray, singlePromptGradientColors } from "@/constants/colors";
import PromptContext from "@/context/PromptContext";

export default function GradientBarContainer() {
  const { prompts } = useContext(PromptContext);

  return (
    <div className="gap-x-10 grid grid-cols-4 pl-12 pr-80">
      {prompts.length === 1 ? (
        <GradientBar colors={singlePromptGradientColors} max={5} />
      ) : (
        prompts.map((prompt, index) => (
          <GradientBar key={prompt.id} colors={gradientsArray[index]} />
        ))
      )}
    </div>
  );
}
