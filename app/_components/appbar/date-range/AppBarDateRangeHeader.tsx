import { last20years, months } from "@/constants/date";

export default function AppBarDateRangeHeader({
  date,
  changeYear,
  changeMonth,
}: DateRangeHeaderProps) {
  /**
   * `handleMonthChange` handles the selection of a month from a dropdown.
   *
   * When the user selects a month from the dropdown, this function is triggered.
   * It fetches the selected month's name from the event object and then determines its
   * corresponding index using the `months` array. Once the index is found, it triggers
   * the `changeMonth` function with the index as an argument.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} event - The change event from the month dropdown.
   */
  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    if (value) {
      changeMonth(months.indexOf(value));
    }
  };

  /**
   * `handleYearChange` handles the selection of a year from a dropdown.
   *
   * When the user selects a year from the dropdown, this function is triggered.
   * It fetches the selected year from the event object and converts it into a number.
   * Once converted, it triggers the `changeYear` function with the selected year as
   * its argument.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} event - The change event from the year dropdown.
   */
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    if (value) {
      changeYear(Number(value));
    }
  };

  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid items-center grid-cols-2 gap-x-4">
        <select
          value={date.getFullYear()}
          onChange={handleYearChange}
          className="bg-transparent border border-gray-600 text-gray-400 text-sm rounded-lg py-2 px-4 focus:ring-blue-500 focus:border-blue-500 block placeholder-gray-400"
        >
          {last20years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          value={months[date.getMonth()]}
          onChange={handleMonthChange}
          className="bg-transparent border border-gray-600 text-gray-400 text-sm rounded-lg py-2 px-4 focus:ring-blue-500 focus:border-blue-500 block placeholder-gray-400"
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
