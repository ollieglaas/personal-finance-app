import React from "react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import SeeDetailsRightArrow from "@/assets/images/icon-caret-right.svg";
import Image from "next/image";
import BillListItem from "./BillListItem";
import Link from "next/link";

function BillsOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold flex justify-between items-center">
          <span>Recurring Bills</span>
          <Link href="/bills">
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
      <CardContent className="flex flex-col gap-4">
        <BillListItem />
      </CardContent>
    </Card>
  );
}

export default BillsOverview;
