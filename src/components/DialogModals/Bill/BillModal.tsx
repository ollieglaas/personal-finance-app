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
import { Plus } from "lucide-react";
import React, { useState } from "react";
import BillNameInput from "./BillNameInput";
import FrequencyPicker from "./FrequencyPicker";
import { StartDatePicker } from "./StartDatePicker";
import BillAmount from "./BillAmount";
import { ColorValue } from "../Budget/BudgetModal";
import ColorInput from "../Budget/ColorInput";
import useBillsStore from "@/hooks/useBillsStore";
import { toast } from "@/hooks/use-toast";

function BillModal() {
  const [modalOpen, setModalOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [frequency, setFrequency] = useState(1);
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<Date>();
  const [loading, setLoading] = useState(false);
  const [colorValue, setColorValue] = useState<ColorValue>({
    label: "",
    hexValue: "",
  });
  const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
  const { bills, setBills } = useBillsStore();

  const [error, setError] = useState({
    name: false,
    amount: false,
    color: false,
  });

  function formatDate(dateString: string): string {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  const handleClick = () => {
    const nameExists = bills.some(
      (bill) => bill.title.toLowerCase() === nameInput.trim().toLowerCase()
    );

    const errors = {
      name: nameInput.trim().length === 0 || nameExists,
      amount: amount! <= 0,
      color: !colorValue.hexValue,
    };

    setError(errors);

    if (Object.values(errors).some((hasError) => hasError)) return;

    const newBill = {
      title: nameInput,
      frequency,
      amount,
      theme: colorValue.hexValue,
      dueDate: formatDate(date!.toString()),
      paid: false,
    };

    setLoading(true);
    wait().then(() => {
      setBills([...bills, newBill]);
      setLoading(false);
      setModalOpen(false);
      setNameInput("");
      setFrequency(1);
      setAmount(0);
      setDate(undefined);
      setColorValue({ label: "", hexValue: "" });
      toast({
        title: "Success",
        description: "You have successfully added a new bill.",
      });
    });
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          <span>Add New Bill</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-6">
          <DialogTitle className="text-2xl font-bold">
            Add New Recurring Payment
          </DialogTitle>
          <DialogDescription>
            Add a new recurring payment to manage your monthly, biannual and
            annual expenses. Provide the bills name, due frequency, and payment
            amount.
          </DialogDescription>
        </DialogHeader>
        <div>
          <BillNameInput
            nameInputValue={nameInput}
            setNameInputValue={setNameInput}
            error={error.name}
          />
          <div className="flex flex-row justify-between gap-4 my-4">
            <div className="w-1/2">
              <FrequencyPicker
                frequency={frequency}
                setFrequency={setFrequency}
              />
            </div>
            <div className="w-1/2">
              <StartDatePicker date={date} setDate={setDate} />
            </div>
          </div>
          <BillAmount
            amountValue={amount!}
            setAmountValue={setAmount}
            error={error.amount}
          />
          <ColorInput
            colorValue={colorValue}
            setColorValue={setColorValue}
            error={error.color}
            modalType="bills"
          />
          <Button className="mt-8 w-full" onClick={handleClick}>
            {loading ? "Adding..." : "Add New Payment"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default BillModal;
