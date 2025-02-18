import React, { SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export interface SearchTableProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<SetStateAction<string>>;
}

function SearchTable({ searchQuery, setSearchQuery }: SearchTableProps) {
  return (
    <div className="relative w-full">
      <Input
        type="text"
        placeholder="Search transaction"
        className="pr-10 tracking-wide font-light py-6 border-gray-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
    </div>
  );
}

export default SearchTable;
