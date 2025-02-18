"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useBudgetsStore, { Budget } from "@/hooks/useBudgetsStore";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import MaxSpendInput from "./MaxSpendInput";
import PaidInput from "./PaidInput";
import { Button } from "@/components/ui/button";

interface EditBudgetProps {
  budget: Budget;
}

function EditBudget({ budget }: EditBudgetProps) {
  const { category, maximum, paid } = budget;
  const [maxInput, setMaxInput] = useState(maximum);
  const [paidInput, setPaidInput] = useState(paid);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { budgets, setBudgets } = useBudgetsStore();
  const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
  const [error, setError] = useState({
    paid: false,
    max: false,
  });

  const handleClick = () => {
    const errors = {
      paid: paidInput < 0,
      max: maxInput <= 0,
    };

    setError(errors);

    if (Object.values(errors).some((hasError) => hasError)) return;

    setLoading(true);
    wait().then(() => {
      const updatedBudgets = budgets.map((b) =>
        b.category === category
          ? { ...b, maximum: maxInput, paid: paidInput }
          : b
      );

      setBudgets(updatedBudgets);

      setLoading(false);
      setModalOpen(false);
    });
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Pencil className="hover:cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-6">
          <DialogTitle className="text-2xl font-bold">
            Edit {category}
          </DialogTitle>
          <DialogDescription>
            Edit your budget for {category} here. Change your paid amount or
            your maximum limit.
          </DialogDescription>
        </DialogHeader>
        <div>
          <PaidInput
            paidValue={paidInput}
            setPaidValue={setPaidInput}
            error={error.paid}
          />
          <MaxSpendInput
            maxSpendValue={maxInput}
            setMaxSpendValue={setMaxInput}
            error={error.max}
          />
          <Button onClick={handleClick} className="w-full mt-6">
            {loading ? "Saving..." : "Save Budget"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditBudget;
