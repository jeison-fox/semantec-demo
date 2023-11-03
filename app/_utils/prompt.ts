import { promptColors } from "@/constants/colors";
import { promptKeys } from "@/constants/general";

/**
 * Retrieves the color associated with a prompt based on a provided index.
 *
 * @param {number} index - The index of the prompt color to retrieve.
 *
 * @returns {string} - The color associated with the prompt at the provided index.
 */
export const getPromptColorByIndex = (index: number): string => {
  const promptColorsKeys = Object.keys(promptColors) as PromptKey[];

  if (index < 0 || index >= promptColorsKeys.length) {
    return "#FFFFFF";
  }

  const promptKey = promptColorsKeys[index];
  return promptColors[promptKey];
};

/**
 * Checks if a given item is of type `PromptItem`.
 *
 * This utility function is used to determine if a given item has the shape
 * of a `PromptItem` object by checking if it is an object and contains
 * the `url`, `showToolTip` and `value` properties.
 *
 * @param {PromptItem | string} item - The item to be checked.
 *
 * @returns {boolean} - Returns `true` if the item is of type `PromptItem`, otherwise `false`.
 */
export const isPromptItem = (item: PromptItem | string): item is PromptItem =>
  typeof item === "object" && "url" in item && "value" in item;

/**
 * Checks if the given string key matches any of the predefined prompt keys.
 *
 * @param {string} key - The key to be checked.
 *
 * @returns {boolean} - Returns `true` if the `key` matches any of the predefined prompt
 * keys (`prompt1`, `prompt2`, `prompt3`, `prompt4`); otherwise returns `false`.
 */
export const isPromptKey = (key: string): key is PromptKey =>
  promptKeys.includes(key as PromptKey);

/**
 * Checks if a given entry qualifies as a valid prompt entry.
 *
 * This function confirms if both the key and value of the entry match the
 * expected types for valid prompts, aiding in type narrowing in TypeScript.
 *
 * @param { [string, string | PromptItem] } entry - Tuple with key and potential PromptItem.
 *
 * @returns { boolean } - True if entry is of type [PromptKey, PromptItem], else false.
 */
export const isPromptEntry = (
  entry: [string, string | PromptItem],
): entry is [PromptKey, PromptItem] => {
  const [key, value] = entry;
  return isPromptKey(key) && isPromptItem(value);
};

/**
 * Generates a mapping between PromptKeys (prompt1, prompt2, etc.) and the provided prompt strings.
 *
 * The function takes an array of strings representing the prompts and maps them to the
 * corresponding PromptKeys in order. If a prompt is not provided, the default value will be an empty string.
 *
 * @param prompts - An array of strings representing the prompts.
 *
 * @returns A record mapping PromptKeys to the corresponding prompt strings.
 */
export const promptMapping = (
  prompts: string[],
): Record<PromptKey, string> => ({
  prompt1: prompts[0] || "",
  prompt2: prompts[1] || "",
  prompt3: prompts[2] || "",
  prompt4: prompts[3] || "",
});
