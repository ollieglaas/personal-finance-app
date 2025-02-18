import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import usePotsStore from "@/hooks/usePotsStore";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";

function DeletePot({ potTitle }: { potTitle: string }) {
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { pots, setPots } = usePotsStore();
  const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

  function onDelete() {
    setLoading(true);
    wait().then(() => {
      const updatedPots = pots.filter((pot) => pot.name !== potTitle);
      setPots(updatedPots);
      setModalOpen(false);
      setLoading(false);
      toast({
        title: "Success",
        description: "You have successfully deleted the pot.",
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
            Delete {potTitle}?
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this pot? This action cannot be
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

export default DeletePot;
