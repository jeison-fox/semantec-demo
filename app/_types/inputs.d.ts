export {};

declare global {
  type ChipColor = "bg-blue-5" | "bg-teal-5" | "bg-orange-5" | "bg-pink-5";

  type TextFieldDataProps = {
    disabled?: boolean;
    id: string;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    type: string;
  };
}
