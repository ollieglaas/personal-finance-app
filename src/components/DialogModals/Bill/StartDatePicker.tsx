"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface StartDatePickerProps {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export function StartDatePicker({ date, setDate }: StartDatePickerProps) {
  //   const [date, setDate] = React.useState<Date>();

  return (
    <Popover modal={true}>
      <span className="text-xs font-bold text-gray-500">Starting From...</span>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full text-center font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <PopoverClose asChild>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
