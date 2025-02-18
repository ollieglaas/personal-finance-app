import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";
import React from "react";

interface TargetInputProps {
  targetInputValue: number;
  setTargetInputValue: React.Dispatch<React.SetStateAction<number>>;
  error: boolean;
}

function TargetInput({
  targetInputValue,
  setTargetInputValue,
  error,
}: TargetInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    setTargetInputValue(Number.isNaN(value) ? 0 : value);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-gray-500">Target</span>
        {error && (
          <span className="text-red-500 text-xs font-bold">
            Target cannot be 0
          </span>
        )}
      </div>
      <div className="relative w-full">
        <Input
          type="number"
          min={1}
          max={100000}
          placeholder="e.g. 5000"
          className={`pl-12 tracking-wide font-light py-6 mt-1 mb-6 ${
            error ? "border-red-500" : "border-gray-500"
          }`}
          value={targetInputValue || ""}
          onChange={handleChange}
        />
        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
    </>
  );
}

export default TargetInput;
