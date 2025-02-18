"use client";
import React from "react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import Image from "next/image";
import SeeDetailsRightArrow from "@/assets/images/icon-caret-right.svg";
import BudgetsChart from "./BudgetsChart";
import { useSidebar } from "../ui/sidebar";
import ExpenseListItem from "./ExpenseListItem";
import clsx from "clsx";
import useBudgetsStore from "@/hooks/useBudgetsStore";
import Link from "next/link";

function BudgetsOverview() {
  const { open } = useSidebar();
  const { budgets } = useBudgetsStore((state) => state);

  const layoutWrapper = clsx(
    "w-full sm:w-[80%] lg:w-[50%] flex flex-row justify-center items-center",
    "sm:items-end xl:items-center flex-wrap sm:flex-col",
    {
      "md:flex-row md:flex-wrap md:w-[100%]": open,
      "md:flex-col": !open,
    },
    "lg:flex-col gap-y-4"
  );

  const cardContentWrapper = clsx(
    "flex flex-col sm:flex-row",
    { "md:flex-col": open, "md:flex-row": !open },
    "lg:flex-row gap-4"
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold flex justify-between items-center">
          <span>Budgets</span>
          <Link href="/budgets">
            <Button variant={"link"} className="text-gray-500">
              <span className="tracking-[0.1px]">See Details</span>
              <Image
                src={SeeDetailsRightArrow}
                alt="See Details"
                width={4}
                height={4}
                className="opacity-75"
              />
            </Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className={cardContentWrapper}>
        <BudgetsChart />
        <div className={layoutWrapper}>
          {budgets.slice(0, 4).map((budget) => (
            <ExpenseListItem key={budget.category} data={budget} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default BudgetsOverview;
