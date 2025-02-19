import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import SeeDetailsRightArrow from "@/assets/images/icon-caret-right.svg";
import { Table, TableBody, TableRow, TableCell } from "../ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { formatAmount, formatDate } from "../Overview/TransactionsOverview";
import { BudgetProps } from "./BudgetCard";
import useTransactionsStore from "@/hooks/useTransactionsStore";

function LatestSpendingTable({ budget }: BudgetProps) {
  const { category } = budget;
  return (
    <Card className="bg-background border-none">
      <CardHeader className="p-4">
        <CardTitle className="text-lg md:text-xl font-bold flex justify-between items-center">
          <span>Latest Spending</span>
          <Link href={"/transactions"}>
            <Button variant={"link"} className="text-gray-500 md:space-x-4">
              <span className="tracking-[0.1px] text-sm md:text-lg">
                See All
              </span>
              <Image
                src={SeeDetailsRightArrow}
                alt="See Details"
                width={6}
                height={6}
                className="opacity-75"
              />
            </Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SpendingTable category={category} />
      </CardContent>
    </Card>
  );
}

const SpendingTable = ({ category }: { category: string }) => {
  const { transactions } = useTransactionsStore((state) => state);
  const transactionData = transactions
    .filter(
      (transaction) =>
        transaction.amount < 0 && transaction.category === category
    ) // filter to spending transactions only
    .slice(0, 3); // only first 3

  return (
    <Table>
      <TableBody>
        {transactionData.map((transaction) => (
          <TableRow key={transaction.date}>
            <TableCell className="font-medium py-4 px-0">
              <div className="flex flex-row gap-4 items-center">
                <Avatar className="hidden lg:block">
                  <AvatarImage src={`${transaction.avatar}`} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="md:font-bold">{transaction.name}</span>
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

export default LatestSpendingTable;
