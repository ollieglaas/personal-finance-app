"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import NameInput from "./NameInput";
import TargetInput from "./TargetInput";
import ColorInput from "../Budget/ColorInput";
import usePotsStore from "@/hooks/usePotsStore";
import { useToast } from "@/hooks/use-toast";

function PotModal() {
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nameInputValue, setNameInputValue] = useState("");
  const [targetInputValue, setTargetInputValue] = useState(0);
  const [colorInputValue, setColorInputValue] = useState({
    label: "",
    hexValue: "",
  });
  const [error, setError] = useState({
    name: false,
    target: false,
    color: false,
  });

  const { pots, setPots } = usePotsStore();
  const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

  function handleSubmit() {
    const errors = {
      name: nameInputValue.trim().length === 0,
      target: targetInputValue <= 0,
      color: !colorInputValue.hexValue,
    };

    setError(errors);

    if (Object.values(errors).some((hasError) => hasError)) return;

    const newPot = {
      name: nameInputValue,
      target: targetInputValue,
      total: 0,
      theme: colorInputValue.hexValue,
    };

    setLoading(true);
    wait().then(() => {
      setPots([...pots, newPot]);
      setModalOpen(false);
      setLoading(false);

      setNameInputValue("");
      setTargetInputValue(0);
      setColorInputValue({ label: "", hexValue: "" });

      console.log("Pot added:", newPot);
      toast({
        title: "Success",
        description: "You have successfully added a new pot.",
      });
    });
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          <span className="hidden md:block">Add New Pot</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-6">
          <DialogTitle className="text-2xl font-bold">Add New Pot</DialogTitle>
          <DialogDescription>
            Create a pot to set savings targets. These can help keep you on
            track as you save for special purchases.
          </DialogDescription>
        </DialogHeader>
        <div>
          <NameInput
            nameInputValue={nameInputValue}
            setNameInputValue={setNameInputValue}
            error={error.name}
          />
          <TargetInput
            targetInputValue={targetInputValue}
            setTargetInputValue={setTargetInputValue}
            error={error.target}
          />
          <ColorInput
            colorValue={colorInputValue}
            setColorValue={setColorInputValue}
            modalType={"pot"}
            error={error.color}
          />
          <Button
            className="mt-2 w-full py-6 rounded-lg"
            onClick={handleSubmit}
          >
            {loading ? "Adding Pot..." : "Add Pot"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PotModal;
