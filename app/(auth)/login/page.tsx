import LoginForm from "@/components/forms/login";

export default function Login(): JSX.Element {
  return (
    <main className="flex h-full items-center justify-center">
      <div className="bg-[#F7F7F7] shadow-lg rounded-xl p-9 w-[300px] lg:w-[400px]">
        <LoginForm />
      </div>
    </main>
  );
}
