"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import useBudgetsStore from "@/hooks/useBudgetsStore";
import { useToast } from "@/hooks/use-toast";

function DeleteBudget({ budgetTitle }: { budgetTitle: string }) {
  const { toast } = useToast();
  const { budgets, setBudgets } = useBudgetsStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

  function onDelete() {
    setLoading(true);
    wait().then(() => {
      const updatedBudgets = budgets.filter(
        (budget) => budget.category !== budgetTitle
      );
      setBudgets(updatedBudgets);
      setModalOpen(false);
      setLoading(false);
      toast({
        title: "Success",
        description: "You have successfully deleted the budget.",
      });
    });
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Trash2 className="hover:cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-6">
          <DialogTitle className="text-2xl font-bold">
            Delete {budgetTitle}?
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this budget? This action cannot be
            reversed, and all the data inside it will be removed permanently.
          </DialogDescription>
          <div className="flex gap-4 w-full">
            <DialogClose className="w-[50%]" asChild>
              <Button variant="ghost" className="bg-gray-100">
                Go Back
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              className="w-[50%]"
              onClick={onDelete}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteBudget;
