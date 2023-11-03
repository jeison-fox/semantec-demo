"use server";

export default async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  try {
    const apiUrl = process.env.API_URL;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password,
      }),
    };

    const response = await fetch(`${apiUrl}/login`, requestOptions);

    if (!response.ok) {
      return { error: "Error fetching geographic data" };
    }

    return (await response.json()) as LoginResponse;
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }

    return { error: "An unexpected error occurred fetching geographic data" };
  }
}
