"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ data }: { data: ILinkData }): JSX.Element {
  const pathname = usePathname();
  const { href, name } = data;
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`font-medium h-10 inline-flex items-center justify-center leading-tight rounded-full w-28 px-6 py-2.5 text-sm text-[#121212] tracking-tight transition-colors hover:bg-[#0BB37B] ${
        isActive ? "bg-[#0DC789]" : "bg-[#F7F7F7]"
      }`}
    >
      {name}
    </Link>
  );
}
