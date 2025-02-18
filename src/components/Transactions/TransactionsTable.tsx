"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatAmount, formatDate } from "../Overview/TransactionsOverview";
import TablePagination from "./TablePagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useSidebar } from "../ui/sidebar";
import SearchTable from "./SearchTable";
import GeneralSort from "./GeneralSort";
import CategorySort from "./CategorySort";
import useTransactionsStore from "@/hooks/useTransactionsStore";

const PAGE_SIZE = 10;

function TransactionsTable() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [generalSortValue, setGeneralSortValue] = useState("Latest");
  const [categorySortValue, setCategorySortValue] =
    useState("All Transactions");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { open } = useSidebar();

  const { transactions } = useTransactionsStore((state) => state);
  // all search bar sorting logic
  const searchedTransactions = transactions.filter((transaction) =>
    transaction.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const dataToSort = searchQuery ? searchedTransactions : transactions;

  // filters by general selection filter
  const sortedData = [...dataToSort].sort((a, b) => {
    switch (generalSortValue) {
      case "Latest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "Oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "A to Z":
        return a.name.localeCompare(b.name);
      case "Z to A":
        return b.name.localeCompare(a.name);
      case "Highest $":
        return b.amount - a.amount;
      case "Lowest $":
        return a.amount - b.amount;
      default:
        return 0;
    }
  });

  // filters by category selection if there is one
  const filteredCategoryData = sortedData.filter((transaction) => {
    return (
      categorySortValue === "All Transactions" ||
      transaction.category === categorySortValue
    );
  });

  // all pagination logic
  const totalTransactions = filteredCategoryData.length;
  const totalPages = Math.ceil(totalTransactions / PAGE_SIZE);

  const currentPage = parseInt(searchParams.get("page") || "1");
  const validPage = Math.max(1, Math.min(currentPage, totalPages));

  const currentData = filteredCategoryData.slice(
    (validPage - 1) * PAGE_SIZE,
    validPage * PAGE_SIZE
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      router.push(`?page=${page}`);
    }
  };

  useEffect(() => {
    if (currentPage !== validPage) {
      router.replace(`?page=${validPage}`);
    }
  }, [currentPage, validPage, router]);

  useEffect(() => {
    const checkScreenSize = () => setIsDesktop(window.innerWidth >= 1280);

    checkScreenSize(); // Check on mount
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row justify-between">
          <div className="w-[120%] lg:w-[50%]">
            <SearchTable
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          <div className="flex flex-row gap-12 lg:gap-24 justify-end w-full">
            <div>
              <span className="text-sm text-gray-500 hidden xl:inline-block">
                Sort by
              </span>
              <span className="ml-4">
                <GeneralSort
                  generalSortValue={generalSortValue}
                  setGeneralSortValue={setGeneralSortValue}
                  isDesktop={isDesktop}
                />
              </span>
            </div>

            <div>
              <span className="text-sm text-gray-500 hidden xl:inline-block">
                Category
              </span>
              <span className="ml-4">
                <CategorySort
                  categorySortValue={categorySortValue}
                  setCategorySortValue={setCategorySortValue}
                  isDesktop={isDesktop}
                />
              </span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="bg-white rounded-xl">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">Recipient / Sender</TableHead>
              <TableHead
                className={`hidden ${
                  open ? "md:hidden" : "md:table-cell"
                } lg:table-cell`}
              >
                Category
              </TableHead>
              <TableHead
                className={`hidden ${
                  open ? "md:hidden" : "md:table-cell"
                } lg:table-cell`}
              >
                Transaction Date
              </TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((transaction) => (
              <TableRow key={transaction.date}>
                <TableCell className="py-6 w-[50%]">
                  <div className="flex flex-row gap-4 items-center">
                    <Avatar>
                      <AvatarImage src={`${transaction.avatar}`} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-between">
                      <span className="font-bold text-sm">
                        {transaction.name}
                      </span>
                      <span
                        className={`table-cell ${
                          open ? "md:table-cell" : "md:hidden"
                        } lg:hidden`}
                      >
                        {transaction.category}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  className={`hidden ${
                    open ? "md:hidden" : "md:table-cell"
                  } lg:table-cell text-gray-500`}
                >
                  <span>{transaction.category}</span>
                </TableCell>
                <TableCell
                  className={`hidden ${
                    open ? "md:hidden" : "md:table-cell"
                  } lg:table-cell`}
                >
                  <span className="text-gray-500 text-sm">
                    {formatDate(transaction.date)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col justify-between">
                    <span
                      className={`text-sm font-bold ${
                        transaction.amount > 0
                          ? "text-emerald-700"
                          : "text-black"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : "-"}$
                      {formatAmount(transaction.amount)}
                    </span>
                    <span
                      className={`text-gray-500 text-sm table-cell ${
                        open ? "md:table-cell" : "md:hidden"
                      } lg:hidden`}
                    >
                      {formatDate(transaction.date)}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <TablePagination
          currentPage={validPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </CardFooter>
    </Card>
  );
}

export default TransactionsTable;
