"use client";

import { useRouter } from "next/navigation";

import { login } from "@/actions/auth";

export default function LoginForm(): JSX.Element {
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await login(email, password);

      if (!res.error && res.user) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event: React.FormEvent<ILoginFormElement>): void => {
    event.preventDefault();

    const {
      email: { value: emailValue },
      password: { value: passwordValue },
    } = event.currentTarget;

    void handleLogin(emailValue, passwordValue);
  };

  return (
    <form onSubmit={handleSubmit} className="text-center">
      <h1 className="font-semibold mb-8 text-3xl text-[#2A2379]">
        Account Access
      </h1>
      <label htmlFor="email" className="flex flex-col mb-4">
        <input
          id="email"
          type="email"
          placeholder="Email"
          required
          className="bg-transparent h-14 outline outline-1 outline-zinc-500 pl-4 py-1 rounded transition-all placeholder:text-zinc-500 hover:outline-[#7871DA] hover:outline-2 focus:outline-[#7871DA] focus:outline-2 focus-visible:outline-2 focus-visible:outline-[#7871DA]"
        />
      </label>
      <label htmlFor="password" className="flex flex-col">
        <input
          id="password"
          type="password"
          placeholder="Password"
          required
          className="bg-transparent h-14 outline outline-1 outline-zinc-500 pl-4 py-1 rounded transition-all placeholder:text-zinc-500 hover:outline-[#7871DA] hover:outline-2 focus:outline-[#7871DA] focus:outline-2 focus-visible:outline-2 focus-visible:outline-[#7871DA]"
        />
      </label>
      <button
        type="submit"
        className="bg-[#0DC789] font-medium h-10 inline-flex items-center justify-center leading-tight mt-8 rounded-full w-28 px-6 py-2.5 text-sm text-[#121212] tracking-tight transition-colors hover:bg-[#0BB37B]"
      >
        Login
      </button>
    </form>
  );
}
