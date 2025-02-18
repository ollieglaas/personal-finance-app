import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import useBillsStore from "@/hooks/useBillsStore";
import { toast } from "@/hooks/use-toast";

function DeleteBill({ billTitle }: { billTitle: string }) {
  const [loading, setLoading] = useState(false);
  const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
  const { bills, setBills } = useBillsStore();

  function handleClick() {
    setLoading(true);
    wait().then(() => {
      const updatedBills = bills.filter((bill) => bill.title !== billTitle);
      setBills(updatedBills);
      setLoading(false);
      toast({
        title: "Success",
        description: "You have successfully deleted the bill.",
      });
    });
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <X
          className="text-gray-200 hover:text-gray-500 cursor-pointer"
          size={16}
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {billTitle}?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this bill? All data will be removed
            and this action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={handleClick}
          >
            {loading ? "Deleting..." : "Delete Bill"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteBill;
