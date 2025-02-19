"use client";
import React from "react";
import {
  TableCaption,
  TableRow,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";
import { formatAmount, formatDate } from "./TransactionsOverview";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import useTransactionsStore from "@/hooks/useTransactionsStore";

const TransactionsTable = () => {
  const { transactions } = useTransactionsStore((state) => state);
  const transactionData = transactions.slice(0, 5);

  return (
    <Table>
      <TableCaption>
        A list of your recent invoices. Select{" "}
        <span className="font-bold">View All</span> to see more.
      </TableCaption>
      <TableBody>
        {transactionData.map((transaction) => (
          <TableRow key={transaction.date}>
            <TableCell className="font-medium py-4">
              <div className="flex flex-row gap-4 items-center">
                <Avatar>
                  <AvatarImage src={`${transaction.avatar}`} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="font-normal md:font-bold">
                  {transaction.name}
                </span>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex flex-col justify-between">
                <span
                  className={`text-sm font-bold ${
                    transaction.amount > 0 ? "text-emerald-700" : "text-black"
                  }`}
                >
                  {transaction.amount > 0 ? "+" : "-"}$
                  {formatAmount(transaction.amount)}
                </span>
                <span className="text-gray-500 text-sm">
                  {formatDate(transaction.date)}
                </span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
