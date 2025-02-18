"use client";
import GeneralMobile from "@/assets/images/icon-sort-mobile.svg";
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

interface GeneralSortProps {
  generalSortValue: string;
  setGeneralSortValue: React.Dispatch<SetStateAction<string>>;
  isDesktop: boolean;
}

const DropdownOptions = [
  { label: "Latest" },
  { label: "Oldest" },
  { label: "A to Z" },
  { label: "Z to A" },
  { label: "Highest $" },
  { label: "Lowest $" },
];

function GeneralSort({
  generalSortValue,
  setGeneralSortValue,
  isDesktop,
}: GeneralSortProps) {
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
            {generalSortValue}
            <ChevronDown size={16} />
          </>
        ) : (
          <Image src={GeneralMobile} alt="Sort Icon" height={22} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="shadow-2xl rounded-xl">
        {DropdownOptions.map((item) => (
          <DropdownItem
            key={item.label}
            label={item.label}
            setGeneralSortValue={setGeneralSortValue}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const DropdownItem = ({
  label,
  setGeneralSortValue,
}: {
  label: string;
  setGeneralSortValue: React.Dispatch<SetStateAction<string>>;
}) => {
  return (
    <>
      <DropdownMenuItem
        onSelect={() => setGeneralSortValue(label)}
        className="py-4 hover:cursor-pointer"
      >
        {label}
      </DropdownMenuItem>
      <DropdownMenuSeparator />
    </>
  );
};

export default GeneralSort;
