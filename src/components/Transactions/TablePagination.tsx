import React from "react";
import { Button } from "../ui/button";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
}: TablePaginationProps) {
  return (
    <div className="flex justify-between items-center w-full">
      <Button
        className="px-4 py-2 rounded-md disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        className="px-4 py-2rounded-md disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}

export default TablePagination;
