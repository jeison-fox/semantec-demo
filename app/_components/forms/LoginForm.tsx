"use client";

import { Alert } from "flowbite-react";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";

import login from "@/actions/auth";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import TextField from "@/components/inputs/TextField";
import routes from "@/constants/routes";

export default function LoginForm(): JSX.Element {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  /**
   * Handles changes to input fields within a form.
   *
   * This function updates the form data state based on changes made to any input field.
   * When the input changes, the function updates the respective property in the state,
   * ensuring the state always reflects the current values of the form fields. If there's
   * an error message displayed, it clears the error message.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  /**
   * Handles the user login process.
   *
   * Attempts to login the user with the provided email and password.
   * If the login is successful and no error is returned, the user's details
   * are saved in a cookie and the user is redirected to the chart route.
   * If any error occurs during the login process, an alert is shown to the user.
   *
   * @param {string} email - The email address used for login.
   * @param {string} password - The password used for login.
   */
  const handleLogin = async ({ email, password }: LoginCredentials) => {
    try {
      const res = await login(email, password);
      setIsLoading(false);

      if (!res.error && res.token) {
        Cookie.set("semantec_t", res.token, { expires: 31 });
        router.push(routes.trends);
      } else if (res.error) {
        setErrorMessage(res.error);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles the form submission for logging in.
   *
   * After preventing the default form submission behavior, it extracts
   * the email and password values from the form and then triggers the
   * login handler function with those values.
   *
   * @param {React.FormEvent<ILoginFormElement>} event - The form submission event.
   */
  const handleSubmit = (event: React.FormEvent<ILoginFormElement>): void => {
    event.preventDefault();
    setIsLoading(true);
    void handleLogin(formData);
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg w-[448px]">
      <h1 className="font-semibold mb-5 text-2xl text-white -tracking-[0.24px]">
        Log in
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
        <TextField
          id="email"
          label="Email"
          placeholder="name@example.com"
          required
          type="email"
          onChange={handleInputChange}
        />
        <TextField
          id="password"
          label="Password"
          placeholder="••••••••••"
          required
          type="password"
          onChange={handleInputChange}
        />
        <PrimaryButton
          fullWidth
          loading={isLoading}
          text="Login"
          type="submit"
        />
        {errorMessage && (
          <Alert color="failure">
            <p className="text-sm">
              Username or password is incorrect. Please try again.
            </p>
          </Alert>
        )}
      </form>
    </div>
  );
}
