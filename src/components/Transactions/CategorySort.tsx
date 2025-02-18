"use client";
import CategoryMobile from "@/assets/images/icon-filter-mobile.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React, { SetStateAction } from "react";

interface CategorySortProps {
  categorySortValue: string;
  setCategorySortValue: React.Dispatch<SetStateAction<string>>;
  isDesktop: boolean;
}

export const DropdownOptions = [
  { label: "All Transactions" },
  { label: "Entertainment" },
  { label: "Bills" },
  { label: "Groceries" },
  { label: "Dining Out" },
  { label: "Transportation" },
  { label: "Personal Care" },
  { label: "Education" },
  { label: "Lifestyle" },
  { label: "Shopping" },
  { label: "General" },
];

function CategorySort({
  categorySortValue,
  setCategorySortValue,
  isDesktop,
}: CategorySortProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`${
          isDesktop
            ? "text-black font-medium border border-gray-500 p-3 text-base rounded-md tracking-wide shadow-sm inline-flex flex-row gap-2 items-center"
            : ""
        } flex items-center gap-2`}
      >
        {isDesktop ? (
          <>
            {categorySortValue}
            <ChevronDown size={16} />
          </>
        ) : (
          <Image src={CategoryMobile} alt="Sort Icon" height={22} />
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="shadow-2xl rounded-xl max-h-80 overflow-y-scroll">
        {DropdownOptions.map((item) => (
          <DropdownItem
            key={item.label}
            label={item.label}
            setCategorySortValue={setCategorySortValue}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const DropdownItem = ({
  label,
  setCategorySortValue,
}: {
  label: string;
  setCategorySortValue: React.Dispatch<SetStateAction<string>>;
}) => {
  return (
    <>
      <DropdownMenuItem
        onSelect={() => setCategorySortValue(label)}
        className="pr-14 py-4 hover:cursor-pointer"
      >
        {label}
      </DropdownMenuItem>
      <DropdownMenuSeparator />
    </>
  );
};

export default CategorySort;
