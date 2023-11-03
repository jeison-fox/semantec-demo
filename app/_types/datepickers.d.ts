export {};

declare global {
  type DateRange = {
    start_date: string;
    end_date: string;
  };

  type DateRangePreset = "pastMonth" | "30days" | "7days" | "custom";

  type DateRangeState = {
    start_date: Date | null | undefined;
    end_date: Date | null | undefined;
  };

  type DateRangeHeaderProps = {
    date: Date;
    changeYear: (year: number) => void;
    changeMonth: (month: number) => void;
  };

  type DateRangeInputProps = Partial<{
    value: string;
    onClick: (event: MouseEvent<HTMLInputElement>) => void;
  }>;
}
