"use client";
import BudgetCard from "@/components/Budgets/BudgetCard";
import BudgetsSummary from "@/components/Budgets/BudgetsSummary";
import { useSidebar } from "@/components/ui/sidebar";
import React from "react";
import useBudgetsStore from "@/hooks/useBudgetsStore";

function BudgetsPage() {
  const { open } = useSidebar();
  const { budgets } = useBudgetsStore((state) => state);

  return (
    <div
      className={`grid grid-cols-1 ${
        open ? "xl:grid-cols-1" : "xl:grid-cols-3"
      } 2xl:grid-cols-3 gap-4`}
    >
      <div className="col-span-1">
        <BudgetsSummary />
      </div>
      <div
        className={`col-span-1 ${
          open ? "lg:col-span-1" : "lg:col-span-2"
        } 2xl:col-span-2 space-y-4`}
      >
        {budgets
          .slice()
          .reverse()
          .map((budget) => (
            <BudgetCard key={budget.category} budget={budget} />
          ))}
      </div>
    </div>
  );
}

export default BudgetsPage;
