import { Input } from "@/components/ui/input";
import React from "react";

interface BillNameInputProps {
  nameInputValue: string;
  setNameInputValue: React.Dispatch<React.SetStateAction<string>>;
  error: boolean;
}

function BillNameInput({
  nameInputValue,
  setNameInputValue,
  error,
}: BillNameInputProps) {
  const MAX_CHARACTERS = 30;

  return (
    <>
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-gray-500">Bill Name</span>
        {error && (
          <span className="text-red-500 text-xs font-bold">
            Bill name cannot be empty or be another bills name
          </span>
        )}
      </div>
      <Input
        type="text"
        placeholder="e.g. Netflix Subscription"
        maxLength={30}
        className={`tracking-wide font-light py-6 my-1 ${
          error ? "border-red-500" : "border-gray-500"
        }`}
        value={nameInputValue}
        onChange={(e) => setNameInputValue(e.target.value)}
        required
      />
      <span
        className={`text-right text-xs mb-2 block ${
          nameInputValue.length >= MAX_CHARACTERS
            ? "text-red-500"
            : "text-gray-500"
        }`}
      >
        {MAX_CHARACTERS - nameInputValue.length} characters left
      </span>
    </>
  );
}

export default BillNameInput;
