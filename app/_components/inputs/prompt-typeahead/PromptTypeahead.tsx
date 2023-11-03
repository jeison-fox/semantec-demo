"use client";

import { usePathname } from "next/navigation";
import { KeyboardEvent, useContext, useState } from "react";
import { LiaSyncSolid } from "react-icons/lia";

import PromptTypeaheadChip from "@/components/inputs/prompt-typeahead/PromptTypeaheadChip";
import { dataTypes } from "@/constants/general";
import PromptContext from "@/context/PromptContext";
import { generateUUID } from "@/utils/general";

export default function PromptTypeahead() {
  const pathname = usePathname();
  const { addPrompt, prompts, removePrompt, resetPrompts } =
    useContext(PromptContext);
  const [awaitingExtraPress, setAwaitingExtraPress] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const isGeographic = pathname.includes(dataTypes.geographic);

  /**
   * Handles the change event for the input element.
   * Updates the state with the current input value.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event object.
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  /**
   * Handles the key press event for the input element.
   *
   * - If the 'Enter' key is pressed and certain conditions are met (e.g. non-empty value and less than 4 prompts),
   *   a new prompt is added.
   * - If the 'Backspace' or 'Delete' keys are pressed and there are existing prompts, the last prompt is removed.
   *
   * @param {KeyboardEvent<HTMLInputElement>} event - The keyboard event object.
   */
  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    const value = inputValue.trim();

    if (event.key === "Enter" && value && prompts.length < 4) {
      const prompt = { id: generateUUID(), value };

      addPrompt(prompt);
      setInputValue("");
    }

    if (
      (event.key === "Backspace" || event.key === "Delete") &&
      prompts.length > 0
    ) {
      if (value.length === 0 && !awaitingExtraPress) {
        setAwaitingExtraPress(true);
      } else if (awaitingExtraPress) {
        removePrompt(prompts[prompts.length - 1].id);
        setAwaitingExtraPress(false);
      }
    }
  };

  /**
   * Handles the click event for the chip's remove button.
   * Removes the associated prompt based on the chip ID.
   *
   * @param {React.MouseEvent<HTMLButtonElement>} event - The mouse click event object.
   */
  const handleRemoveChip = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { chipId } = event.currentTarget.dataset;

    if (chipId) {
      removePrompt(chipId);
    }
  };

  /**
   * Resets all prompts to their default state.
   */
  const handleReset = () => {
    resetPrompts();
  };

  return (
    <>
      <div className="bg-gray-700 relative w-full border border-gray-600 rounded-lg py-2 px-4">
        <div className="flex flex-wrap items-center gap-2">
          {isGeographic && prompts.length === 1 ? (
            <PromptTypeaheadChip
              key={prompts[0].id}
              chip={prompts[0]}
              onClick={handleRemoveChip}
              single
            />
          ) : (
            prompts.map((chip, index) => (
              <PromptTypeaheadChip
                key={chip.id}
                chip={chip}
                index={index}
                onClick={handleRemoveChip}
              />
            ))
          )}
          <input
            type="text"
            className="bg-transparent flex-grow p-2 pr-[88px] border-0 text-sm text-white placeholder:text-gray-400 focus:ring-0"
            placeholder={
              prompts.length === 0 ? "Type a phrase and hit Enter..." : ""
            }
            value={inputValue}
            onChange={handleInputChange}
            onKeyUp={handleKeyUp}
          />
        </div>
        <button
          className="flex items-center absolute text-sm text-gray-400 font-medium right-4 top-1/2 transform -translate-y-1/2 transition-colors hover:text-white"
          onClick={handleReset}
        >
          <LiaSyncSolid />
          <span className="ml-2">Reset all</span>
        </button>
      </div>
      <p className="mt-2 text-right text-xs text-gray-500">
        Click the &apos;x&apos; to remove a prompt, or double-tap the
        delete/backspace key *
      </p>
    </>
  );
}
