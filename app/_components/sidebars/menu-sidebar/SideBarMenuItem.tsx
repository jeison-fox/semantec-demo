import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import SideBarMenuItemContent from "@/components/sidebars/menu-sidebar/SideBarMenuItemContent";

export default function SideBarMenuItem({
  compact,
  data,
}: SideBarMenuLinkProps) {
  const pathname = usePathname();
  const {
    customClass = "",
    disabled = false,
    href,
    icon,
    name,
    secondary = false,
  } = data;
  const isActive = pathname === href;

  const linkClasses = clsx(
    "flex items-center py-4 px-5 transition-colors hover:bg-gray-800",
    { "bg-gray-800": isActive },
    { "cursor-not-allowed hover:bg-transparent": disabled },
    compact && "w-full justify-center",
    customClass,
  );

  return (
    <li>
      {disabled ? (
        <span className={linkClasses}>
          <SideBarMenuItemContent
            color="text-gray-500"
            compact={compact}
            icon={icon}
            name={name}
            secondary={secondary}
          />
        </span>
      ) : (
        <Link href={href} className={linkClasses}>
          <SideBarMenuItemContent
            color="text-white"
            compact={compact}
            icon={icon}
            name={name}
            secondary={secondary}
          />
        </Link>
      )}
    </li>
  );
}
