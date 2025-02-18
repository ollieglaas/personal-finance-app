import React from "react";
import { SearchTableProps } from "../Transactions/SearchTable";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

function SearchBills({ searchQuery, setSearchQuery }: SearchTableProps) {
  return (
    <div className="relative w-full">
      <Input
        type="text"
        placeholder="Search bill"
        className="pr-10 tracking-wide font-light py-6 border-gray-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
    </div>
  );
}

export default SearchBills;
