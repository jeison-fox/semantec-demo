import { forwardRef } from "react";
import { IoCalendar } from "react-icons/io5";

const AppBarDateRangeInput: React.FC<DateRangeInputProps> = forwardRef<
  HTMLInputElement,
  DateRangeInputProps
>(({ value, onClick }, ref) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <IoCalendar className="w-4 h-4 text-gray-400" />
      </div>
      <input
        ref={ref}
        type="text"
        value={value}
        readOnly
        onClick={onClick}
        className="bg-transparent border border-gray-600 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-44 py-2 px-4 pl-9"
        placeholder="Select date"
      />
    </div>
  );
});

AppBarDateRangeInput.displayName = "AppBarDateRangeInput";

export default AppBarDateRangeInput;
