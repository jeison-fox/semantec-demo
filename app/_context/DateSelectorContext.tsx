import { createContext } from "react";

const DateSelectorContext = createContext<DateSelectorContext>({
  dateRange: {
    start_date: "",
    end_date: "",
  },
  datePreset: "30days",
  setDateRange: () => {},
  setDatePreset: () => {},
});

export default DateSelectorContext;
