import clsx from "clsx";

export default function SideBarMenuItemContent({
  color,
  compact,
  icon,
  name,
  secondary,
}: SideBarMenuItemContentProps) {
  return (
    <>
      {icon}
      {!compact && (
        <span
          className={clsx(
            "ml-3 font-medium",
            color,
            secondary ? "text-sm" : "text-base",
          )}
        >
          {name}
        </span>
      )}
    </>
  );
}
