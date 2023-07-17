export {};

declare global {
  interface ILinkData {
    href: string;
    name: string;
  }

  interface ILoginFormElement extends HTMLFormElement {
    email: HTMLInputElement;
    password: HTMLInputElement;
  }

  interface ILoginResponse {
    error: string | null;
    status: number;
    user: {
      email: string;
      password: string;
    };
  }
}
