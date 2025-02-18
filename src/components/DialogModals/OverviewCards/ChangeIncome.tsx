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
import useBalanceStore from "@/hooks/useBalanceStore";
import { DollarSign, Pencil } from "lucide-react";
import React, { SetStateAction, useState } from "react";

interface ChangeIncomeProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

function ChangeIncome({ modalOpen, setModalOpen }: ChangeIncomeProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState(0);
  const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
  const { setBalance, balance } = useBalanceStore();

  function handleClick() {
    const incomeError = inputValue <= 0;

    setError(incomeError);
    if (incomeError) return;

    setLoading(true);

    wait().then(() => {
      setBalance({
        ...balance,
        income: inputValue,
      });
      setLoading(false);
      setModalOpen(false);
      setInputValue(0);
    });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber;
    setInputValue(Number.isNaN(value) ? 0 : value);
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Pencil size={18} className="hover:cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-6">
          <DialogTitle className="text-2xl font-bold">
            Change your income
          </DialogTitle>
          <DialogDescription>
            Use the input below to edit your monthly income.
          </DialogDescription>
          <div className="">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-gray-500">
                New Income
              </span>
              {error && (
                <span className="text-red-500 text-xs font-bold">
                  Income must be at least 1.
                </span>
              )}
            </div>
            <div className="relative w-full">
              <Input
                type="number"
                min={0}
                placeholder="e.g. 4500"
                className={`pl-12 tracking-wide font-light py-6 mt-1 mb-6 ${
                  error ? "border-red-500" : "border-gray-500"
                }`}
                value={inputValue || ""}
                onChange={handleChange}
              />
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
            </div>
            <Button className="w-full" onClick={handleClick}>
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ChangeIncome;
