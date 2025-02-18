"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorClassName?: string;
  depositValue?: number;
  depositIndicatorClassName?: string;
  withdrawValue?: number;
  withdrawIndicatorClassName?: string;
  initialValue?: number; // Add this for initial value
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      value,
      indicatorClassName,
      depositValue,
      depositIndicatorClassName,
      withdrawValue,
      withdrawIndicatorClassName,
      initialValue = 0, // Default initial value to 0
      ...props
    },
    ref
  ) => {
    const [progress, setProgress] = useState(initialValue); // State for animation

    useEffect(() => {
      setProgress(value || 0); // Trigger animation on value change (including mount)
    }, [value]);

    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
          className
        )}
        {...props}
      >
        {/* Primary Indicator */}
        <ProgressPrimitive.Indicator
          className={cn(
            `${
              (depositValue !== undefined || withdrawValue !== undefined) &&
              "absolute left-0"
            } h-full bg-[--progress-bar-color] transition-all`,
            indicatorClassName
          )}
          style={{
            width: `${Math.min(progress, 100)}%`,
            transition: "width 0.5s ease-out",
          }}
        />

        {/* depositValue and withdrawValue are same but are separate to future proof */}
        {depositValue !== undefined && (
          <ProgressPrimitive.Indicator
            className={cn(
              "absolute left-0 h-full bg-[#000] transition-all ",
              depositIndicatorClassName
            )}
            style={{ width: `${Math.min(depositValue || 0, 100)}%` }}
          />
        )}

        {withdrawValue !== undefined && (
          <ProgressPrimitive.Indicator
            className={cn(
              "absolute left-0 h-full bg-[#000] transition-all ",
              withdrawIndicatorClassName
            )}
            style={{ width: `${Math.min(withdrawValue || 0, 100)}%` }}
          />
        )}
      </ProgressPrimitive.Root>
    );
  }
);

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
