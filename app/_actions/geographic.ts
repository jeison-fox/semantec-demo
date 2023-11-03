"use server";

import { cookies } from "next/headers";

/**
 * Fetches geographic data based on provided date range and prompts.
 *
 * @param {Object} params - The parameters for fetching geographic data.
 * @param {DateRange} params.dateRange - The date range for the query.
 * @param {string[]} params.prompts - The list of prompts for the query.
 *
 * @returns {Promise<[GeographicResponse?, string?]>} A promise that resolves to an array where:
 * - The first element is the geographic response data or undefined if an error occurs.
 * - The second element is an error message or undefined if the fetch was successful.
 *
 * @throws If there's a network failure or if the response is not a valid JSON.
 */
export default async function fetchGeographic({
  dateRange,
  prompts,
}: {
  dateRange: DateRange;
  prompts: string[];
}): Promise<GeographicResponse> {
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

    const response = await fetch(`${apiUrl}/run_geo_query`, requestOptions);

    if (!response.ok) {
      const apiError: ApiError = {
        message: response.statusText,
        statusCode: response.status,
      };

      return [undefined, apiError];
    }

    const data: GeographicResult = (await response.json()) as GeographicResult;

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
