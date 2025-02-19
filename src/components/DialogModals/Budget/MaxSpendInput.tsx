import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";
import React from "react";

interface MaxSpendInputProps {
  maxSpendValue: number;
  setMaxSpendValue: React.Dispatch<React.SetStateAction<number>>;
  error: boolean;
}

function MaxSpendInput({
  maxSpendValue,
  setMaxSpendValue,
  error,
}: MaxSpendInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    setMaxSpendValue(Number.isNaN(value) ? 0 : value);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-gray-500">Maximum Spend</span>
        {error && (
          <span className="text-xs font-bold text-red-500">
            Maximum must be at least 1
          </span>
        )}
      </div>
      <div className="relative w-full">
        <Input
          type="number"
          min={1}
          max={100000}
          placeholder="e.g 1000"
          className={`pl-12 tracking-wide font-light py-6 ${
            error ? "border-red-500" : "border-gray-500"
          } mt-1 mb-6`}
          value={maxSpendValue || ""}
          onChange={handleChange}
        />
        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
    </>
  );
}

export default MaxSpendInput;
