import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";
import React from "react";

interface BillAmountProps {
  amountValue: number;
  setAmountValue: React.Dispatch<React.SetStateAction<number>>;
  error: boolean;
}

function BillAmount({ amountValue, setAmountValue, error }: BillAmountProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    setAmountValue(Number.isNaN(value) ? 0 : value);
  };

  return (
    <>
      <div className="flex justify-between items-center mt-8">
        <span className="text-xs font-bold text-gray-500">Payment Amount</span>
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
          placeholder="e.g. 10.99"
          className={`pl-12 tracking-wide font-light py-6 ${
            error ? "border-red-500" : "border-gray-500"
          } mt-1 mb-6`}
          value={amountValue || ""}
          onChange={handleChange}
        />
        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
    </>
  );
}

export default BillAmount;
