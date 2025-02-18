import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

interface FrequencyProps {
  frequency: number;
  setFrequency: React.Dispatch<React.SetStateAction<number>>;
}

interface DropdownItemProps {
  value: number;
  label: string;
  setFrequency: React.Dispatch<React.SetStateAction<number>>;
}

export const FrequencyOptions = [
  { label: "1 Week", value: 0 },
  { label: "1 Month", value: 1 },
  { label: "6 Months", value: 6 },
  { label: "12 Months", value: 12 },
];

function FrequencyPicker({ frequency, setFrequency }: FrequencyProps) {
  return (
    <DropdownMenu>
      <span className="text-xs font-bold text-gray-500">Pay Every...</span>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} className="w-full text-center font-normal">
          {FrequencyOptions.find((option) => option.value === frequency)
            ?.label || "Select Frequency"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="shadow-2xl rounded-xl hover:cursor-pointer">
        {FrequencyOptions.map((item) => (
          <DropdownItem
            key={item.label}
            label={item.label}
            value={item.value}
            setFrequency={setFrequency}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const DropdownItem = ({ setFrequency, label, value }: DropdownItemProps) => {
  return (
    <>
      <DropdownMenuItem
        onSelect={() => setFrequency(value)}
        className="px-20 hover:bg-gray-100 hover:cursor-pointer"
      >
        {label}
      </DropdownMenuItem>
      <DropdownMenuSeparator />
    </>
  );
};

export default FrequencyPicker;
