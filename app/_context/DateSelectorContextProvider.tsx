"use client";

import { useCallback, useMemo, useState } from "react";

import DateSelectorContext from "@/context/DateSelectorContext";
import { getLast30DaysDateRange } from "@/utils/date";

export default function DateSelectorContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dateRange, setDateRange] = useState<DateRange>(() =>
    getLast30DaysDateRange(),
  );
  const [datePreset, setDatePreset] = useState<DateRangePreset>("30days");

  const updateDateRange = useCallback((newDateRange: DateRange) => {
    setDateRange(newDateRange);
  }, []);

  const updateDatePreset = useCallback((newDatePreset: DateRangePreset) => {
    setDatePreset(newDatePreset);
  }, []);

  const dateSelectorContextValue = useMemo(
    () => ({
      dateRange,
      datePreset,
      setDateRange: updateDateRange,
      setDatePreset: updateDatePreset,
    }),
    [dateRange, datePreset, updateDateRange, updateDatePreset],
  );

  return (
    <DateSelectorContext.Provider value={dateSelectorContextValue}>
      {children}
    </DateSelectorContext.Provider>
  );
}
