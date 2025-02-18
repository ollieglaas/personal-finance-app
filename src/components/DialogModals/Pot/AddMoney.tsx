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

interface AddMoneyProps {
  pot: Pot;
}

function AddMoney({ pot }: AddMoneyProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { name, target, total, theme } = pot;
  const [addedAmount, setAddedAmount] = useState(0);
  const [error, setError] = useState(false);
  const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
  const { pots, setPots } = usePotsStore();
  const { toast } = useToast();

  const percentage = (total / target) * 100;
  const remainder = target - total;
  const newPercentage = Math.min(((total + addedAmount) / target) * 100, 100);
  const updatedTotal = Math.min(total + addedAmount, target);

  function handleClick() {
    const amountError = addedAmount === 0 || addedAmount > remainder;

    setError(amountError);
    console.log(error);
    if (amountError) return;

    setLoading(true);
    wait().then(() => {
      const updatedPots = pots.map((pot) =>
        pot.name === name
          ? { ...pot, total: pot.total + addedAmount } // Update total for the matching pot
          : pot
      );
      setPots(updatedPots);
      setModalOpen(false);
      setLoading(false);
      setAddedAmount(0);
      toast({
        title: "Success",
        description: (
          <>
            You have added <strong>${addedAmount}</strong> to{" "}
            <strong>{name}</strong>. There is now{" "}
            <strong>${updatedTotal}</strong> in the pot.
          </>
        ),
      });
    });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    setAddedAmount(Number.isNaN(value) ? 0 : value);
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button className="bg-background w-[50%]" variant={"ghost"}>
          <span>+ Add Money</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-6">
          <DialogTitle className="text-2xl font-bold">
            Add to {name}
          </DialogTitle>
          <DialogDescription>
            Add money to your pot and keep your savings on track. Enter an
            amount and confirm to update your balance.
          </DialogDescription>
          <div>
            <div className="flex flex-row justify-between items-center mb-4">
              <h3 className="text-gray-500">New Amount</h3>
              <h1
                className="text-4xl font-bold"
                style={{ color: updatedTotal > total ? theme : "black" }}
              >
                ${updatedTotal.toFixed(2)}
              </h1>
            </div>
            <Progress
              value={newPercentage}
              depositValue={percentage}
              style={
                {
                  "--progress-bar-color": theme,
                } as React.CSSProperties
              }
              className="bg-background mb-4"
              indicatorClassName="rounded-r-lg"
              depositIndicatorClassName={`border-r-2 border-background`}
            />
            <div className="flex flex-row justify-between items-center text-sm mb-8">
              <span className="font-bold" style={{ color: theme }}>
                {newPercentage.toFixed(2)}%
              </span>
              <span className="text-gray-500">
                Target of ${target.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-gray-500">
                Amount to Add
              </span>
              {error && (
                <span className="text-red-500 text-xs font-bold">
                  Amount must be between 1 and {remainder}
                </span>
              )}
            </div>

            <div className="relative w-full">
              <Input
                type="number"
                min={0}
                max={target - total}
                placeholder="e.g. 150"
                className={`pl-12 tracking-wide font-light py-6 mt-1 mb-6 ${
                  error ? "border-red-500" : "border-gray-500"
                }`}
                value={addedAmount || ""}
                onChange={handleChange}
              />
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
            </div>
            <Button className="w-full mt-4 py-6" onClick={handleClick}>
              {loading ? "Adding..." : "Confirm Addition"}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AddMoney;
