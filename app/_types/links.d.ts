export {};

declare global {
  type SideBarMenuLinkDataProps = {
    customClass?: string;
    disabled?: boolean;
    href: string;
    icon: JSX.Element;
    name: string;
    secondary?: boolean;
  };

  type SideBarMenuLinkProps = {
    compact: boolean;
    data: SideBarMenuLinkDataProps;
  };

  type SideBarMenuItemContentProps = {
    color: string;
    compact: boolean;
    icon: JSX.Element;
    name: string;
    secondary?: boolean;
    textClasses?: string;
  };
}
