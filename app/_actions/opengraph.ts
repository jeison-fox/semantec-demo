"use server";

import { cookies } from "next/headers";

/**
 * Retrieves details for a list of URLs using OpenGraph standards.
 *
 * @param {string[]} urls - An array of URLs for which details are to be retrieved.
 *
 * @returns {Promise<[OpengraphResponse?, string?]>} A promise that resolves to an array where:
 * - The first element is the OpenGraph response data or undefined if an error occurs.
 * - The second element is an error message or undefined if the fetch was successful.
 *
 * @throws Will throw an error if there's a network failure or if the response is not a valid JSON.
 */
export default async function retrieveUrlDetails(
  urls: string[],
): Promise<OpengraphResponse> {
  try {
    const apiUrl = process.env.API_URL;
    const cookiesStore = cookies();
    const token = cookiesStore.get("semantec_t");

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.value ?? ""}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        urls,
      }),
    };

    const response = await fetch(`${apiUrl}/run_thumb_query`, requestOptions);

    if (!response.ok) {
      const apiError: ApiError = {
        message: response.statusText,
        statusCode: response.status,
      };

      return [undefined, apiError];
    }

    const data: OpengraphResult = (await response.json()) as OpengraphResult;

    return [data, undefined];
  } catch (error) {
    const apiError: ApiError = {
      message: "An unexpected error occurred fetching geographic data",
      statusCode: 500,
    };

    if (error instanceof Error) {
      apiError.message = error.message;
      return [undefined, apiError];
    }

    return [undefined, apiError];
  }
}
