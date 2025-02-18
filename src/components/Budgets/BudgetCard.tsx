import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ColoredCircle } from "../Pots/PotCard";
import { Progress } from "../ui/progress";
import LatestSpendingTable from "./LatestSpendingTable";
import DeleteBudget from "../DialogModals/Budget/DeleteBudget";
import EditBudget from "../DialogModals/Budget/EditBudget";

export interface BudgetProps {
  budget: {
    category: string;
    maximum: number;
    paid: number;
    theme: string;
  };
}

function BudgetCard({ budget }: BudgetProps) {
  const { category, maximum, paid, theme } = budget;
  const percentComplete = (paid / maximum) * 100;
  const budgetRemaining = maximum - paid;
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <Card
      key={category}
      className={`p-4 transition-opacity duration-500 ease-in-out ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div className="flex gap-4 items-center">
            <ColoredCircle color={theme} />
            <span className="text-xl md:text-2xl font-bold ">{category}</span>
          </div>
          <div className="flex gap-12 md:gap-16 items-center">
            <EditBudget budget={budget} />
            <DeleteBudget budgetTitle={category} />
          </div>
          {/* <BudgetCardOptionsDropdown /> */}
          {/* <DeleteBudget budgetTitle={category} /> */}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <h3 className="text-gray-500 tracking-wide">
          Maximum of ${maximum.toFixed(2)}
        </h3>
        <Progress
          value={Math.ceil(percentComplete)}
          className="bg-background h-8 p-1 rounded-md"
          indicatorClassName="rounded-md"
          style={{ "--progress-bar-color": theme } as React.CSSProperties}
        />
        <div className="grid grid-cols-2">
          <div
            className="col-span-1 flex flex-col justify-between pl-4 border-l-4 rounded gap-2"
            style={{ borderLeftColor: budget.theme }}
          >
            <span className="text-gray-500">Paid</span>
            <span className="font-bold">${paid.toFixed(2)}</span>
          </div>
          <div className="col-span-1 flex flex-col justify-between pl-4 border-l-4 rounded gap-2">
            <span className="text-gray-500">Remaining</span>
            <span className="font-bold">
              ${budgetRemaining > 0 ? budgetRemaining.toFixed(2) : 0}
            </span>
          </div>
        </div>
        <LatestSpendingTable budget={budget} />
      </CardContent>
    </Card>
  );
}

export default BudgetCard;
