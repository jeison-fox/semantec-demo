import NavLink from "@/components/links/navLink";

export default function DataDisplayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const links = [
    { href: "/", name: "Home" },
    { href: "/map", name: "Map" },
    { href: "/chart", name: "Chart" },
  ];

  return (
    <div className="flex flex-col h-full w-full">
      <nav className="bg-[#F7F7F7] shadow-md shrink-0">
        <ul className="flex items-center justify-center gap-x-4 py-5 px-2">
          {links.map((link) => {
            return (
              <li key={link.name}>
                <NavLink data={link} />
              </li>
            );
          })}
        </ul>
      </nav>
      <main className="grow">
        <div className="h-full p-10">{children}</div>
      </main>
    </div>
  );
}
