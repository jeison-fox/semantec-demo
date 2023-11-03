import clsx from "clsx";
import { useContext } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { promptTwBorderColors, promptTwTextColors } from "@/constants/colors";
import ContentSidebarContext from "@/context/ContentSidebarContext";
import { isPromptKey } from "@/utils/prompt";

export default function ContentSidebarHeader({
  loading,
  prompts,
  selectedPrompts,
  updateSelectedPrompts,
}: {
  loading: boolean;
  prompts: Prompt[];
  selectedPrompts: PromptKey[];
  updateSelectedPrompts: React.Dispatch<React.SetStateAction<PromptKey[]>>;
}) {
  const { isContentSidebarOpen, toggleContentSidebarVisibility } = useContext(
    ContentSidebarContext,
  );

  /**
   * Handles the state change when a prompt checkbox is toggled.
   *
   * - If the checkbox was checked, its associated `PromptKey` value is added to the
   *   `selectedPrompts` state.
   * - If the checkbox was unchecked, its associated `PromptKey` value is removed
   *   from the `selectedPrompts` state.
   *
   * @param event - The change event of the checkbox input.
   */
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: PromptKey = event.target.value as PromptKey;

    updateSelectedPrompts((prevState: PromptKey[]) => {
      if (prevState.includes(value)) {
        return prevState.filter((promptValue) => promptValue !== value);
      }

      return [...prevState, value];
    });
  };

  /**
   * Toggles the visibility of the content sidebar.
   */
  const handleToggleSidebar = () => {
    toggleContentSidebarVisibility();
  };

  return (
    <div
      className={clsx(
        "bg-green-dark-jungle flex items-center py-4 pl-6 pr-2",
        isContentSidebarOpen && "justify-between",
      )}
    >
      {!isContentSidebarOpen && (
        <button className="group mr-2" onClick={handleToggleSidebar}>
          <FaChevronLeft className="text-2xl text-gray-500 group-hover:text-gray-400" />
        </button>
      )}
      <h3 className="m-0 text-base text-white">Top Content</h3>
      {isContentSidebarOpen && (
        <div className="flex items-center">
          <div className="flex gap-x-2 items-center mr-3">
            {prompts.length > 1 &&
              prompts.map((prompt, index) => {
                const promptKey = `prompt${index + 1}`;

                return (
                  <input
                    key={prompt.id}
                    checked={
                      isPromptKey(promptKey) &&
                      selectedPrompts.includes(promptKey)
                    }
                    onChange={handleCheckboxChange}
                    type="checkbox"
                    value={promptKey}
                    disabled={loading}
                    className={`w-4 h-4 ${promptTwTextColors[promptKey]} ${promptTwBorderColors[promptKey]} bg-transparent border-2 cursor-pointer rounded disabled:border-gray-400 disabled:text-gray-400 focus:ring-0 focus:ring-offset-transparent focus:ring-offset-0 focus:ring-transparent`}
                  />
                );
              })}
          </div>
          <button className="group" onClick={handleToggleSidebar}>
            <FaChevronRight className="text-2xl text-gray-500 group-hover:text-gray-400" />
          </button>
        </div>
      )}
    </div>
  );
}
