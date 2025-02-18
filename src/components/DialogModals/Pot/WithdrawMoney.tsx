"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import usePotsStore, { Pot } from "@/hooks/usePotsStore";
import { DollarSign } from "lucide-react";
import React, { useState } from "react";

interface WithdrawMoneyProps {
  pot: Pot;
}

function WithdrawMoney({ pot }: WithdrawMoneyProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const [withdrawnAmount, setWithdrawnAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { name, target, total } = pot;
  const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
  const { pots, setPots } = usePotsStore();
  const { toast } = useToast();

  const percentage = (total / target) * 100;
  const updatedTotal = Math.max(total - withdrawnAmount, 0);
  const newPercentage = Math.max(((total - withdrawnAmount) / target) * 100, 0);
  const withdrawValue = Math.max(newPercentage, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    setWithdrawnAmount(Number.isNaN(value) ? 0 : value);
  };

  function handleClick() {
    const amountError = withdrawnAmount === 0 || withdrawnAmount > total;

    setError(amountError);
    console.log(error);
    if (amountError) return;

    setLoading(true);
    wait().then(() => {
      const updatedPots = pots.map((pot) =>
        pot.name === name
          ? { ...pot, total: pot.total - withdrawnAmount } // Subtract withdrawn amount
          : pot
      );

      setPots(updatedPots);
      setModalOpen(false);
      setLoading(false);
      setWithdrawnAmount(0);
      toast({
        title: "Success",
        description: (
          <>
            You have withdrawn <strong>${withdrawnAmount}</strong> from{" "}
            <strong>{name}</strong>. There is now{" "}
            <strong>${updatedTotal}</strong> in the pot.
          </>
        ),
      });
    });
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button className="bg-background w-[50%]" variant={"ghost"}>
          <span>Withdraw</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-6">
          <DialogTitle className="text-2xl font-bold">
            Withdraw from {name}
          </DialogTitle>
          <DialogDescription>
            Withdraw funds from your selected savings pot. Enter the amount you
            would like to withdraw and confirm to update your pot.
          </DialogDescription>
          <div>
            <div className="flex flex-row justify-between items-center mb-4">
              <h3 className="text-gray-500">New Amount</h3>
              <h1
                className="text-4xl font-bold"
                style={{ color: updatedTotal < total ? "#bb0000" : "black" }}
              >
                ${updatedTotal.toFixed(2)}
              </h1>
            </div>
            <Progress
              value={percentage}
              withdrawValue={withdrawValue}
              style={
                {
                  "--progress-bar-color": "#bb0000",
                } as React.CSSProperties
              }
              className="bg-background mb-4"
              indicatorClassName="rounded-r-lg"
              withdrawIndicatorClassName={`border-r-2 border-background`}
            />
            <div className="flex flex-row justify-between items-center text-sm mb-8">
              <span className="font-bold" style={{ color: "#bb0000" }}>
                {newPercentage.toFixed(2)}%
              </span>
              <span className="text-gray-500">
                Target of ${target.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-gray-500">
                Amount to Withdraw
              </span>
              {error && (
                <span className="text-red-500 text-xs font-bold">
                  Amount must be between 1 and {total}
                </span>
              )}
            </div>
            <div className="relative w-full">
              <Input
                type="number"
                min={0}
                placeholder="e.g. 20"
                className={`pl-12 tracking-wide font-light py-6 mt-1 mb-6 ${
                  error ? "border-red-500" : "border-gray-500"
                }`}
                value={withdrawnAmount || ""}
                onChange={handleChange}
              />
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
            </div>
            <Button className="w-full mt-4 py-6" onClick={handleClick}>
              {loading ? "Withdrawing..." : "Confirm Withdrawal"}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default WithdrawMoney;
