import { TinyColor } from "@ctrl/tinycolor";

/**
 * Interpolates a color based on a given value, using a range of numbers and corresponding colors.
 *
 * @param {number} value - The value for which to interpolate a color.
 * @param {number[]} numbersArray - An array of numbers representing the range of values for interpolation.
 * @param {string[]} colorsArray - An array of color strings (e.g., HEX, RGB, etc.) corresponding to the values in `numbersArray`.
 *
 * @returns {string} - The interpolated color as a HEX string.
 */
const interpolateColor = (
  value: number,
  numbersArray: number[],
  colorsArray: string[],
): string => {
  if (value >= numbersArray[numbersArray.length - 1]) {
    return colorsArray[colorsArray.length - 1];
  }

  let lowerIndex = 0;
  let upperIndex = 0;

  for (let i = 0; i < numbersArray.length; i += 1) {
    if (
      numbersArray[i] <= value &&
      (i === numbersArray.length - 1 || numbersArray[i + 1] > value)
    ) {
      lowerIndex = i;
      upperIndex = Math.min(i + 1, numbersArray.length - 1);
      break;
    }
  }

  const lowerColor = new TinyColor(colorsArray[lowerIndex]);
  const upperColor = new TinyColor(colorsArray[upperIndex]);

  const position =
    ((value - numbersArray[lowerIndex]) /
      (numbersArray[upperIndex] - numbersArray[lowerIndex])) *
    100;

  return lowerColor.mix(upperColor, position).toHexString();
};

export default interpolateColor;
