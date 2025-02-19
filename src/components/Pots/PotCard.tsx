"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { useSidebar } from "../ui/sidebar";
import { Progress } from "../ui/progress";

import usePotsStore from "@/hooks/usePotsStore";
import DeletePot from "../DialogModals/Pot/DeletePot";
import AddMoney from "../DialogModals/Pot/AddMoney";
import WithdrawMoney from "../DialogModals/Pot/WithdrawMoney";
import EditPot from "../DialogModals/Pot/EditPot";

function PotCard() {
  const { open } = useSidebar();
  const { pots } = usePotsStore((state) => state);

  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className="flex flex-wrap gap-4 md:p-4">
      {pots
        .slice()
        .reverse()
        .map((pot) => {
          const progressColor = pot.theme;
          const percentComplete = (pot.total / pot.target) * 100;
          return (
            <Card
              key={pot.name}
              className={`w-full ${
                open ? "lg:w-full" : "lg:w-[calc(50%-0.5rem)]"
              } xl:w-[calc(50%-0.5rem)] py-2 rounded-lg transition-opacity duration-500 ease-in-out ${
                fadeIn ? "opacity-100" : "opacity-0"
              }`}
            >
              <CardHeader className="mb-6">
                <CardTitle className="flex justify-between">
                  <div className="flex gap-4 items-center">
                    <ColoredCircle color={pot.theme} />
                    <span className="text-xl md:text-2xl font-bold ">
                      {pot.name}
                    </span>
                  </div>
                  <div className="flex gap-12 md:gap-16 items-center">
                    <EditPot pot={pot} />
                    <DeletePot potTitle={pot.name} />
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-500">Total Saved</span>
                  <span className="font-bold text-3xl">
                    ${pot.total.toFixed(2)}
                  </span>
                </div>
                <Progress
                  value={Math.ceil(percentComplete)}
                  className={`bg-background`}
                  style={
                    {
                      "--progress-bar-color": progressColor,
                    } as React.CSSProperties
                  }
                />
                <div className="flex justify-between">
                  <span className="text-sm font-bold text-gray-500">
                    {Math.min(percentComplete, 100).toFixed(0)}%
                  </span>
                  <span className="text-sm text-gray-500">
                    Target of ${pot.target}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  {/* <Button className="bg-background w-[50%]" variant={"ghost"}>
                    <span>+ Add Money</span>
                  </Button> */}
                  <AddMoney pot={pot} />
                  <WithdrawMoney pot={pot} />
                </div>
              </CardContent>
            </Card>
          );
        })}
    </div>
  );
}

// const PotCardOptionsDropdown = () => {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger>
//         <Image src={EllipsisIcon} alt="Ellipsis" />
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="">
//         <DropdownMenuItem className="hover:cursor-pointer ">
//           Edit Pot
//         </DropdownMenuItem>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem className="text-red-600 hover:text-red-600 hover:cursor-pointer ">
//           Delete Pot
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

export const ColoredCircle = ({ color }: { color: string }) => {
  return (
    <div
      className={`h-6 w-6 rounded-[100px]`}
      style={{ backgroundColor: color }}
    />
  );
};

export default PotCard;
