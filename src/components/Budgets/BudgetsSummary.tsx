import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import BudgetsChart from "../Overview/BudgetsChart";
import BudgetListItem from "./BudgetListItem";
import { useSidebar } from "../ui/sidebar";

function BudgetsSummary() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const { open } = useSidebar();
  return (
    <Card
      className={`p-4 transition-opacity duration-500 ease-in-out ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <CardContent
        className={`flex flex-col lg:flex-col ${
          open ? "xl:flex-row" : "xl:flex-col"
        } 2xl:flex-col justify-between`}
      >
        <BudgetsChart />
        <div
          className={`text-left ${
            open ? "xl:w-[50%]" : "xl:w-[100%]"
          }2xl:w-[100%] pt-8 font-bold text-lg space-y-8`}
        >
          <h1>Spending Summary</h1>
          <BudgetListItem />
        </div>
      </CardContent>
    </Card>
  );
}

export default BudgetsSummary;
