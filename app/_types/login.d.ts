export {};

declare global {
  interface ILoginFormElement extends HTMLFormElement {
    email: HTMLInputElement;
    password: HTMLInputElement;
  }

  type LoginCredentials = {
    email: string;
    password: string;
  };

  type LoginResponse =
    | { error: string; token?: never }
    | { error?: never; token: string }
    | { error: null; token?: never }
    | { error?: never; token: null };
}
