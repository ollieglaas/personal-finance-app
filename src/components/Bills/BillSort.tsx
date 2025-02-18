import React, { SetStateAction } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import SortMobile from "@/assets/images/icon-sort-mobile.svg";

interface BillSortProps {
  sortValue: string;
  setSortValue: React.Dispatch<React.SetStateAction<string>>;
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

function BillSort({ sortValue, setSortValue, isDesktop }: BillSortProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`${
          isDesktop &&
          "text-black font-medium border border-gray-500 p-3 text-base rounded-md tracking-wide shadow-sm inline-flex flex-row gap-2 items-center"
        }`}
      >
        {isDesktop ? (
          <>
            {sortValue}
            <ChevronDown size={16} />
          </>
        ) : (
          <Image src={SortMobile} alt="Sort Icon" height={22} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="shadow-2xl rounded-xl">
        {DropdownOptions.map((item) => (
          <DropdownItem
            key={item.label}
            label={item.label}
            setSortValue={setSortValue}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const DropdownItem = ({
  label,
  setSortValue,
}: {
  label: string;
  setSortValue: React.Dispatch<SetStateAction<string>>;
}) => {
  return (
    <>
      <DropdownMenuItem
        onSelect={() => setSortValue(label)}
        className="py-4 hover:cursor-pointer"
      >
        {label}
      </DropdownMenuItem>
      <DropdownMenuSeparator />
    </>
  );
};

export default BillSort;
