"use client";

import "@/styles/datepicker.css";
import "react-datepicker/dist/react-datepicker.css";

import { lightFormat, parseISO } from "date-fns";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import AppBarDateRangeHeader from "@/components/appbar/date-range/AppBarDateRangeHeader";
import AppBarDateRangeInput from "@/components/appbar/date-range/AppBarDateRangeInput";
import { promptDateFormat } from "@/constants/date";
import DateSelectorContext from "@/context/DateSelectorContext";
import { getFixedDateRange } from "@/utils/date";

export default function AppBarDateRangeSelector() {
  const { datePreset, setDateRange, setDatePreset } =
    useContext(DateSelectorContext);
  const [dates, setDates] = useState<DateRangeState>({
    start_date: null,
    end_date: null,
  });
  const [isManualUpdate, setIsManualUpdate] = useState(false);
  const startDateLimit = new Date("2023-08-01");
  const endDateLimit = new Date("2023-11-30");

  /**
   * Effect hook to set the date range.
   *
   * Listens for changes to the `dates` object and updates the `dateRange` state
   * when both `start_date` and `end_date` are provided.
   */
  useEffect(() => {
    if (dates.start_date && dates.end_date && isManualUpdate) {
      const formattedDateRange = {
        start_date: lightFormat(dates.start_date, promptDateFormat),
        end_date: lightFormat(dates.end_date, promptDateFormat),
      };

      setDateRange(formattedDateRange);

      if (datePreset !== "custom") {
        setDatePreset("custom");
      }
    }
  }, [dates]);

  /**
   * Effect hook to reset the date range when the date preset changes.
   *
   * Listens for changes to the `datePreset` value and resets the `dates` state
   * when the preset is not "custom".
   */
  useEffect(() => {
    if (datePreset !== "custom") {
      setIsManualUpdate(false);
      const dateRange = getFixedDateRange(datePreset);

      setDates({
        start_date: parseISO(dateRange.start_date),
        end_date: parseISO(dateRange.end_date),
      });
    }
  }, [datePreset]);

  /**
   * Handles the change event for the end date picker.
   *
   * When a valid date is selected, the `end_date` in the `dates` state is updated
   * with the new date value. If null is provided, the function does nothing, ensuring
   * the `end_date` remains unchanged.
   *
   * @param {Date | null} date - The selected date from the end date picker.
   */
  const handleEndDateChange = (date: Date | null) => {
    if (date) {
      setDates((prevDates) => ({
        ...prevDates,
        end_date: date,
      }));

      setIsManualUpdate(true);
    }
  };

  /**
   * Handles the change event for the start date picker.
   *
   * When a valid date is selected, the `start_date` in the `dates` state is updated
   * with the new date value. If null is provided, the function does nothing, ensuring
   * the `start_date` remains unchanged.
   *
   * @param {Date | null} date - The selected date from the start date picker.
   */
  const handleStartDateChange = (date: Date | null) => {
    if (date) {
      setDates((prevDates) => ({
        ...prevDates,
        start_date: date,
      }));

      setIsManualUpdate(true);
    }
  };

  return (
    <div className="flex items-center">
      <DatePicker
        selected={dates.start_date}
        onChange={handleStartDateChange}
        startDate={dates.start_date}
        endDate={dates.end_date}
        minDate={startDateLimit}
        maxDate={dates.end_date || endDateLimit}
        showPopperArrow={false}
        selectsStart
        customInput={<AppBarDateRangeInput />}
        renderCustomHeader={AppBarDateRangeHeader}
        dateFormat={promptDateFormat}
      />
      <span className="mx-4 text-gray-400 text-sm">to</span>
      <DatePicker
        selected={dates.end_date}
        onChange={handleEndDateChange}
        startDate={dates.start_date}
        endDate={dates.end_date}
        minDate={dates.start_date || startDateLimit}
        maxDate={endDateLimit}
        showPopperArrow={false}
        selectsEnd
        customInput={<AppBarDateRangeInput />}
        renderCustomHeader={AppBarDateRangeHeader}
        dateFormat={promptDateFormat}
      />
    </div>
  );
}
