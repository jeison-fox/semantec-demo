/* eslint-disable no-bitwise */

import { snackbarConfig } from "@/constants/general";
/**
 * Generates parameters for displaying a snackbar notification based on given input.
 *
 * - If the status code indicates an unauthorized request (401), a session expiration message is returned.
 * - For other cases, it fetches the configuration from the snackbarConfig based on the type and appends the given severity.
 *
 * @param {string} severity - The severity level of the snackbar message (e.g., "error", "info").
 * @param {number} statusCode - The HTTP status code received from a request or response.
 * @param {SnackBarType} type - The type of snackbar message to be displayed (e.g., "geo", "trends", "meta").
 *
 * @returns {SnackBarParams} An object containing the key, message, and severity for the snackbar notification.
 */
export const generateSnackBarParams = (
  variant: "error" | "success" | "warning" | "info",
  statusCode: number,
  type: SnackBarType,
): SnackBarParams => {
  if (statusCode === 401) {
    return {
      key: "session-expired",
      message: "Your session has expired. Please log in again.",
      variant: "error",
    };
  }

  const params = snackbarConfig[type];
  params.variant = variant;

  return params;
};

/**
 * Generates a random UUID (Version 4).
 *
 * The format of the generated UUID is:
 * xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 * where `x` is any hexadecimal digit and `y` is one of 8, 9, A, or B.
 *
 * @returns {string} The generated UUID.
 */
export const generateUUID = () =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
