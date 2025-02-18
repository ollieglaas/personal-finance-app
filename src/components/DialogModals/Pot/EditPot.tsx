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
import usePotsStore, { Pot } from "@/hooks/usePotsStore";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import NameInput from "./NameInput";
import TargetInput from "./TargetInput";

interface EditPotProps {
  pot: Pot;
}

function EditPot({ pot }: EditPotProps) {
  const { name, target } = pot;
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nameInput, setNameInput] = useState(name);
  const [targetInput, setTargetInput] = useState(target);
  const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
  const { pots, setPots } = usePotsStore();
  const [error, setError] = useState({
    name: false,
    target: false,
  });

  const handleClick = () => {
    const errors = {
      name: nameInput === "",
      target: targetInput <= 0,
    };

    setError(errors);

    if (Object.values(errors).some((hasError) => hasError)) return;

    setLoading(true);
    wait().then(() => {
      const updatedPots = pots.map((p) =>
        p.name === name ? { ...p, name: nameInput, target: targetInput } : p
      );

      setPots(updatedPots);

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
          <DialogTitle className="text-2xl font-bold">Edit {name}</DialogTitle>
          <DialogDescription>
            Edit your pots name and target value.
          </DialogDescription>
        </DialogHeader>
        <div>
          <NameInput
            nameInputValue={nameInput}
            setNameInputValue={setNameInput}
            error={error.name}
          />
          <TargetInput
            targetInputValue={targetInput}
            setTargetInputValue={setTargetInput}
            error={error.target}
          />
          <Button onClick={handleClick} className="w-full mt-6">
            {loading ? "Saving..." : "Save Budget"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditPot;
