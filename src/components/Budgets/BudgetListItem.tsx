import React from "react";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import useBudgetsStore from "@/hooks/useBudgetsStore";

function BudgetListItem() {
  const { budgets } = useBudgetsStore((state) => state);
  return (
    <div className="flex flex-col gap-4">
      <Table>
        <TableBody>
          {budgets.map((budget) => (
            <TableRow key={budget.category}>
              <TableCell className={`py-4 text-gray-500 font-semibold px-0`}>
                <span
                  className={`border-l-4 pl-4`}
                  style={{ borderLeftColor: budget.theme }}
                >
                  {budget.category}
                </span>
              </TableCell>
              <TableCell className={`text-right space-x-4`}>
                <span className=" font-bold text-md">
                  ${budget.paid.toFixed(2)}
                </span>
                <span className="font-semibold text-gray-500 text-xs">
                  of ${budget.maximum.toFixed(2)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default BudgetListItem;
