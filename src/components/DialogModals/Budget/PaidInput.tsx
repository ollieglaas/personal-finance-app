import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";
import React from "react";

interface PaidInputProps {
  paidValue: number;
  setPaidValue: React.Dispatch<React.SetStateAction<number>>;
  error: boolean;
}

function PaidInput({ error, paidValue, setPaidValue }: PaidInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    setPaidValue(Number.isNaN(value) ? 0 : value);
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-gray-500">Total Paid</span>
        {error && (
          <span className="text-xs font-bold text-red-500">
            Please enter a valid number
          </span>
        )}
      </div>
      <div className="relative w-full">
        <Input
          type="number"
          min={1}
          max={100000}
          placeholder="e.g. 2000"
          className={`pl-12 tracking-wide font-light py-6 ${
            error ? "border-red-500" : "border-gray-500"
          } mt-1 mb-6`}
          value={paidValue}
          onChange={handleChange}
        />
        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
    </>
  );
}

export default PaidInput;
