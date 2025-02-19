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
import { Card, CardContent, CardHeader } from "../ui/card";
import { formatDate } from "../Overview/TransactionsOverview";
import SearchBills from "./SearchBills";
import BillSort from "./BillSort";
import useBillsStore from "@/hooks/useBillsStore";
import { FrequencyOptions } from "../DialogModals/Bill/FrequencyPicker";

import DeleteBill from "../DialogModals/Bill/DeleteBill";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

function BillsTable() {
  const { bills } = useBillsStore((state) => state);
  const { setBills } = useBillsStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortValue, setSortValue] = useState("Latest");
  const [isDesktop, setIsDesktop] = useState(false);
  const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

  // all search bar sorting logic
  const searchedBills = bills.filter((bill) =>
    bill.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const dataToSort = searchQuery ? searchedBills : bills;

  // filters by general selection filter
  const sortedData = [...dataToSort].sort((a, b) => {
    switch (sortValue) {
      case "Latest":
        return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      case "Oldest":
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case "A to Z":
        return a.title.localeCompare(b.title);
      case "Z to A":
        return b.title.localeCompare(a.title);
      case "Highest $":
        return b.amount - a.amount;
      case "Lowest $":
        return a.amount - b.amount;
      default:
        return 0;
    }
  });

  const handlePayStatus = ({ title }: { title: string }) => {
    wait().then(() => {
      setBills(
        bills.map((bill) => {
          if (bill.title === title) {
            return { ...bill, paid: !bill.paid };
          }
          return bill;
        })
      );
    });
  };

  useEffect(() => {
    const checkScreenSize = () => setIsDesktop(window.innerWidth >= 1280);

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <Card className="">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <SearchBills
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <div>
          <BillSort
            sortValue={sortValue}
            setSortValue={setSortValue}
            isDesktop={isDesktop}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="text-sm">
            <TableRow>
              <TableHead className="w-[5%]"></TableHead>
              <TableHead className="w-[60%] md:w-[30%] ">Bill Title</TableHead>
              <TableHead className="table-cell md:hidden">Action</TableHead>
              <TableHead className="hidden md:table-cell">Due Date</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-sm">
            {sortedData.map((bill) => (
              <TableRow key={bill.title}>
                <TableCell className="w-[5%]">
                  <DeleteBill billTitle={bill.title} />
                </TableCell>
                <TableCell className="py-6 w-[60%] md:w-[30%] flex flex-col">
                  <span className="font-semibold">{bill.title}</span>
                  <span className="md:hidden">{formatDate(bill.dueDate)}</span>
                </TableCell>
                <TableCell className="table-cell md:hidden">
                  <Badge
                    className={`${
                      bill.paid ? "bg-green-600" : "bg-red-500"
                    } text-xs`}
                    onClick={() => handlePayStatus({ title: bill.title })}
                  >
                    <span>{bill.paid ? "PAID" : "UNPAID"}</span>
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-col gap-2">
                    {formatDate(bill.dueDate)}{" "}
                    <span className="text-xs font-normal text-gray-500">
                      Paid Every{" "}
                      {
                        FrequencyOptions.find(
                          (option) => option.value === bill.frequency
                        )?.label
                      }
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge
                    className={`${bill.paid ? "bg-green-600" : "bg-red-500"}`}
                    onClick={() => handlePayStatus({ title: bill.title })}
                  >
                    {bill.paid ? "PAID" : "DUE"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-bold">
                  ${bill.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default BillsTable;
