import { DropdownOptions } from "@/components/Transactions/CategorySort";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import React, { SetStateAction } from "react";
import useBudgetsStore from "@/hooks/useBudgetsStore";

interface BudgetCategoryInputProps {
  budgetCategoryValue: string;
  setBudgetCategoryValue: React.Dispatch<SetStateAction<string>>;
  error: boolean;
}

const filteredCategorySelections = DropdownOptions.filter(
  (option) => option.label !== "All Transactions"
);

const BudgetCategoryInput = ({
  budgetCategoryValue,
  setBudgetCategoryValue,
  error,
}: BudgetCategoryInputProps) => {
  return (
    <DropdownMenu>
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-gray-500">Theme</span>
        {error && (
          <span className="text-red-500 text-xs font-bold">
            Category must be selected
          </span>
        )}
      </div>
      <DropdownMenuTrigger
        className={`border ${
          error ? "border-red-500" : "border-gray-500"
        } rounded-lg w-full text-left px-4 py-3 flex justify-between items-center mt-1 mb-6`}
      >
        {budgetCategoryValue ? (
          <>
            {budgetCategoryValue}
            <ChevronDown size={16} />
          </>
        ) : (
          <>
            <span className="text-gray-500">Select Category</span>
            <ChevronDown size={16} />
          </>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        hideWhenDetached
        className="max-h-96 overflow-y-scroll min-w-96 border-2 border-gray-400"
      >
        {filteredCategorySelections.map((item) => (
          <DropdownItem
            key={item.label}
            label={item.label}
            setBudgetCategoryValue={setBudgetCategoryValue}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const DropdownItem = ({
  label,
  setBudgetCategoryValue,
}: {
  label: string;
  setBudgetCategoryValue: React.Dispatch<SetStateAction<string>>;
}) => {
  const { budgets } = useBudgetsStore((state) => state);
  const budgetCategories = budgets.map((budget) => budget.category);
  return (
    <>
      <DropdownMenuItem
        onSelect={() => setBudgetCategoryValue(label)}
        className="px-4 py-2 hover:cursor-pointer hover:bg-slate-100 flex justify-between"
        disabled={budgetCategories.includes(label)}
      >
        <span
          className={`${budgetCategories.includes(label) && "line-through"}`}
        >
          {label}
        </span>
        {budgetCategories.includes(label) && (
          <span className="text-[10px] text-red-600 font-bold tracking-wide">
            ALREADY BUDGETED
          </span>
        )}
      </DropdownMenuItem>
      <DropdownMenuSeparator />
    </>
  );
};

export default BudgetCategoryInput;
