import { Input } from "@/components/ui/input";
import React, { SetStateAction } from "react";

interface NameInputProps {
  nameInputValue: string;
  setNameInputValue: React.Dispatch<SetStateAction<string>>;
  error: boolean;
}

function NameInput({
  nameInputValue,
  setNameInputValue,
  error,
}: NameInputProps) {
  return (
    <>
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-gray-500">Pot Name</span>
        {error && (
          <span className="text-red-500 text-xs font-bold">
            Pot name cannot be empty
          </span>
        )}
      </div>
      <Input
        type="text"
        placeholder="e.g. Summer holiday"
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
          nameInputValue.length >= 30 ? "text-red-500" : "text-gray-500"
        }`}
      >
        {30 - nameInputValue.length} characters left
      </span>
    </>
  );
}

export default NameInput;
