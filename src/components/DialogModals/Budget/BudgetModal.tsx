"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import BudgetCategoryInput from "./BudgetCategoryInput";
import MaxSpendInput from "./MaxSpendInput";
import ColorInput from "./ColorInput";
import useBudgetsStore from "@/hooks/useBudgetsStore";
import { useToast } from "@/hooks/use-toast";

export interface ColorValue {
  label: string;
  hexValue: string;
}

function BudgetModal() {
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [budgetCategoryValue, setBudgetCategoryValue] = useState("");
  const [maxSpendValue, setMaxSpendValue] = useState(0);
  const [colorValue, setColorValue] = useState<ColorValue>({
    label: "",
    hexValue: "",
  });
  const [error, setError] = useState({
    category: false,
    max: false,
    color: false,
  });

  const { budgets, setBudgets } = useBudgetsStore();
  const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

  function handleSubmit() {
    const errors = {
      category: budgetCategoryValue.trim().length === 0,
      max: maxSpendValue <= 0,
      color: !colorValue.hexValue,
    };

    setError(errors);

    if (Object.values(errors).some((hasError) => hasError)) return;

    const newBudget = {
      category: budgetCategoryValue,
      maximum: maxSpendValue,
      paid: 0,
      theme: colorValue.hexValue,
    };

    setLoading(true);
    wait().then(() => {
      setBudgets([...budgets, newBudget]);
      setModalOpen(false);
      setLoading(false);

      setBudgetCategoryValue("");
      setMaxSpendValue(0);
      setColorValue({ label: "", hexValue: "" });

      console.log("Budget added:", newBudget);
      toast({
        title: "Success",
        description: "You have successfully added a new budget.",
      });
    });
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          <span>Add New Budget</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-6">
          <DialogTitle className="text-2xl font-bold">
            Add New Budget
          </DialogTitle>
          <DialogDescription>
            Choose a category to set a spending budget. These categories can
            help you monitor spending.
          </DialogDescription>
        </DialogHeader>
        <div>
          <BudgetCategoryInput
            budgetCategoryValue={budgetCategoryValue}
            setBudgetCategoryValue={setBudgetCategoryValue}
            error={error.category}
          />
          <MaxSpendInput
            maxSpendValue={maxSpendValue}
            setMaxSpendValue={setMaxSpendValue}
            error={error.max}
          />
          <ColorInput
            colorValue={colorValue}
            setColorValue={setColorValue}
            modalType="budget"
            error={error.color}
          />
          <Button
            className="mt-2 w-full py-6 rounded-lg"
            onClick={handleSubmit}
          >
            {loading ? "Adding Budget..." : "Add Budget"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default BudgetModal;
