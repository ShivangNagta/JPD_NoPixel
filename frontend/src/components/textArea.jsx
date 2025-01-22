import * as React from "react";

import { cn } from "../../lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-20 disabled:cursor-not-allowed disabled:opacity-50",
        "border-gray-300 focus:border-white focus:ring-white",
        "dark:bg-[#18181b] dark:text-white dark:border-gray-600 dark:focus:border-white",
        "transition-colors duration-200",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
