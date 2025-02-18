import SeeDetailsRightArrow from "@/assets/images/icon-caret-right.svg";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import TransactionsTable from "./TransactionsTable";

export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return date.toLocaleDateString("en-GB", options).replace(",", "");
}

export const formatAmount = (amount: number) => Math.abs(amount);

function TransactionsOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold flex justify-between items-center">
          <span>Transactions</span>
          <Link href={"/transactions"}>
            <Button variant={"link"} className="text-gray-500">
              <span className="tracking-[0.1px]">View All</span>
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
      <CardContent>
        <TransactionsTable />
      </CardContent>
    </Card>
  );
}

export default TransactionsOverview;
