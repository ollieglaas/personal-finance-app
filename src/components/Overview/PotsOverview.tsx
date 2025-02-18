"use client";
import React from "react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import SeeDetailsRightArrow from "@/assets/images/icon-caret-right.svg";
import Image from "next/image";
import { useSidebar } from "../ui/sidebar";
import ExpenseListItem from "./ExpenseListItem";
import usePotsStore from "@/hooks/usePotsStore";
import Link from "next/link";

const PotsOverview = () => {
  const { open } = useSidebar();
  const { pots } = usePotsStore((state) => state);

  const topPots = pots.sort((a, b) => b.total - a.total).slice(0, 4);
  const totalSaved = pots.reduce((sum, pot) => sum + pot.total, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold flex justify-between items-center">
          <span>Pots</span>
          <Link href="/pots">
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
      <CardContent>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            open ? "md:grid-cols-1" : "md:grid-cols-2"
          } lg:grid-cols-2 gap-4`}
        >
          <div className="col-span-1">
            <Card className="text-center bg-background">
              <CardHeader>
                <CardTitle>Total Saved</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl xl:text-3xl font-bold">
                  ${totalSaved.toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-1 flex flex-row flex-wrap gap-y-4">
            {topPots.map((pot) => (
              <ExpenseListItem key={pot.name} data={pot} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PotsOverview;
