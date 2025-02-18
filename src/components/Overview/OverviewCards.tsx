"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { useSidebar } from "../ui/sidebar";
import useBalanceStore from "@/hooks/useBalanceStore";
import ChangeBalance from "../DialogModals/OverviewCards/ChangeBalance";
import ChangeIncome from "../DialogModals/OverviewCards/ChangeIncome";

const OverviewCards = () => {
  const { current, income, expenses } = useBalanceStore(
    (state) => state.balance
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [hover, setHover] = useState("");
  const CardsContent = [
    {
      label: "Current Balance",
      value: current,
      modal: (
        <ChangeBalance modalOpen={modalOpen} setModalOpen={setModalOpen} />
      ),
    },
    {
      label: "Income",
      value: income,
      modal: <ChangeIncome modalOpen={modalOpen} setModalOpen={setModalOpen} />,
    },
    { label: "Expenses", value: expenses },
  ];

  const { open } = useSidebar();

  return (
    <>
      <div
        className={`grid grid-cols-1 ${
          open ? "md:grid-cols-1" : "md:grid-cols-3"
        } lg:grid-cols-3 gap-4 mb-4`}
      >
        {CardsContent.map((card) => (
          <Card
            key={card.label}
            className={`col-span-1 ${
              card.label === "Current Balance" && "bg-[#201E23] text-white"
            }`}
            onMouseEnter={() => setHover(card.label)}
            onMouseLeave={() => {
              if (!modalOpen) setHover("");
            }}
          >
            <CardHeader className="flex flex-row justify-between items-center relative">
              <CardTitle>{card.label}</CardTitle>
              {hover === card.label && card.label !== "Expenses" && (
                <div className="absolute top-4 right-4">{card.modal}</div>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-4xl lg:text-3xl font-bold">
                ${card.value.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default OverviewCards;
