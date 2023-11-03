export {};

declare global {
  type ButtonDataProps = {
    disabled?: boolean;
    fullWidth?: boolean;
    icon?: ReactNode;
    loading?: boolean;
    loadingText?: string;
    onClick?: () => void;
    text: string;
    type?: "button" | "submit" | "reset";
  };
}
