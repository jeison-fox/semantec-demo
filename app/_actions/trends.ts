"use server";

import { cookies } from "next/headers";

/**
 * Fetches trend data based on a specified date range and prompts.
 *
 * @param {Object} params - The parameters for fetching trend data.
 * @param {DateRange} params.dateRange - The specified date range for the query.
 * @param {string[]} params.prompts - An array of prompts (queries) for trend analysis.
 *
 * @returns {Promise<[TrendsResponse?, string?]>} A promise that resolves to an array where:
 * - The first element is the trend response data or undefined if an error occurs.
 * - The second element is an error message or undefined if the fetch was successful.
 *
 * @throws Will throw an error if there's a network failure or if the response is not a valid JSON.
 */
export default async function fetchTrends({
  dateRange,
  prompts,
}: {
  dateRange: DateRange;
  prompts: string[];
}): Promise<TrendsResponse> {
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
        prompts,
        start_date: dateRange.start_date,
        end_date: dateRange.end_date,
      }),
    };

    const response = await fetch(`${apiUrl}/run_cc_query`, requestOptions);

    if (!response.ok) {
      const apiError: ApiError = {
        message: response.statusText,
        statusCode: response.status,
      };

      return [undefined, apiError];
    }

    const data: TrendsResult = (await response.json()) as TrendsResult;

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
