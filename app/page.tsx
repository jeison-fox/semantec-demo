import Image from "next/image";

import LoginForm from "@/components/forms/LoginForm";
import logoTypeImage from "@/public/logotype.svg";

export default function Home() {
  return (
    <main className="h-full flex flex-col items-center gap-y-28 justify-center">
      <Image
        src={logoTypeImage as string}
        alt="Semantec"
        width={310}
        height={70}
      />
      <LoginForm />
    </main>
  );
}
