import React, { useState } from "react";
import { cn } from "../../lib/utils";

const MonthYearPicker = React.forwardRef(
  ({ className, months, years, onChange, defaultValue = {}, ...props }, ref) => {
    const [selectedMonth, setSelectedMonth] = useState(
      defaultValue.month || months[0] || ""
    );
    const [selectedYear, setSelectedYear] = useState(
      defaultValue.year || years[0] || ""
    );

    const handleMonthChange = (event) => {
      const month = event.target.value;
      setSelectedMonth(month);
      onChange?.({ month, year: selectedYear });
    };

    const handleYearChange = (event) => {
      const year = event.target.value;
      setSelectedYear(year);
      onChange?.({ month: selectedMonth, year });
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center space-x-4 rounded-lg border bg-background p-4 text-foreground shadow-sm",
          className
        )}
        {...props}
      >
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-muted-foreground">
            Month
          </label>
          <select
            className={cn(
              "h-10 w-full rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              "border-gray-300 focus:border-white focus:ring-white",
              "dark:bg-[#18181b] dark:text-white dark:border-gray-600 dark:focus:border-white",
              "transition-colors duration-200"
            )}
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-muted-foreground">
            Year
          </label>
          <select
            className={cn(
              "h-10 w-full rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              "border-gray-300 focus:border-white focus:ring-white",
              "dark:bg-[#18181b] dark:text-white dark:border-gray-600 dark:focus:border-white",
              "transition-colors duration-200"
            )}
            value={selectedYear}
            onChange={handleYearChange}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
);

MonthYearPicker.displayName = "MonthYearPicker";

export { MonthYearPicker };
