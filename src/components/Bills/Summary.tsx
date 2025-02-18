import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Table, TableBody, TableRow, TableCell } from "../ui/table";
import useBillsStore from "@/hooks/useBillsStore";

function Summary() {
  const { bills } = useBillsStore((state) => state);
  const paidBills = bills.filter((bill) => bill.paid);
  const paidBillsTotal = paidBills.reduce((acc, bill) => acc + bill.amount, 0);

  const upcomingBills = bills.filter((bill) => !bill.paid);
  const upcomingBillsTotal = upcomingBills.reduce(
    (acc, bill) => acc + bill.amount,
    0
  );

  const dueSoonBills = upcomingBills.filter((bill) => {
    const dueDate = new Date(bill.dueDate);
    const today = new Date();

    // both days set to midnight to avoid partial days issue
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays <= 7 && diffDays >= 0 && !bill.paid;
  });
  const dueSoonBillsTotal = dueSoonBills.reduce(
    (acc, bill) => acc + bill.amount,
    0
  );

  const BillSummary = [
    { label: "Paid Bills", value: `${paidBills.length} ($${paidBillsTotal})` },
    {
      label: "Total Upcoming",
      value: `${upcomingBills.length} ($${upcomingBillsTotal})`,
    },
    {
      label: "Due Soon",
      value: `${dueSoonBills.length} ($${dueSoonBillsTotal})`,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {BillSummary.map((bills, index) => (
              <TableRow key={bills.label}>
                <TableCell
                  className={`py-4 ${
                    index === 2
                      ? "text-red-500"
                      : index === 0
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {bills.label}
                </TableCell>
                <TableCell
                  className={`text-right font-bold ${
                    index === 2
                      ? "text-red-500"
                      : index === 0
                      ? "text-green-600"
                      : "text-black"
                  }`}
                >
                  {bills.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default Summary;
