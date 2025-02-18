import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import React, { SetStateAction } from "react";
import { ColorValue } from "./BudgetModal";
import { ColoredCircle } from "@/components/Pots/PotCard";
import useBudgetsStore from "@/hooks/useBudgetsStore";
import usePotsStore from "@/hooks/usePotsStore";
import useBillsStore from "@/hooks/useBillsStore";

const colorSelections = [
  { title: "Green", hexValue: "#277C78" },
  { title: "Red", hexValue: "#EF4444" },
  { title: "Blue", hexValue: "#3B82F6" },
  { title: "Yellow", hexValue: "#FBBF24" },
  { title: "Purple", hexValue: "#8B5CF6" },
  { title: "Pink", hexValue: "#EC4899" },
  { title: "Orange", hexValue: "#F97316" },
  { title: "Gray", hexValue: "#6B7280" },
  { title: "Indigo", hexValue: "#6366F1" },
  { title: "Teal", hexValue: "#14B8A6" },
  { title: "Cyan", hexValue: "#06B6D4" },
  { title: "Lime", hexValue: "#84CC16" },
  { title: "Amber", hexValue: "#F59E0B" },
  { title: "Rose", hexValue: "#F43F5E" },
  { title: "Emerald", hexValue: "#289e76" },
  { title: "Sky", hexValue: "#0EA5E9" },
  { title: "Violet", hexValue: "#A855F7" },
  { title: "Fuchsia", hexValue: "#D946EF" },
  { title: "Light Blue", hexValue: "#93C5FD" },
  { title: "Light Pink", hexValue: "#F9A8D4" },
  { title: "Light Green", hexValue: "#9AE6B4" },
  { title: "Light Yellow", hexValue: "#FEF3C7" },
  { title: "Light Purple", hexValue: "#C4B5FD" },
  { title: "Light Orange", hexValue: "#FBD38D" },
  { title: "Light Gray", hexValue: "#D1D5DB" },
];

interface ColorInputProps {
  colorValue: ColorValue;
  setColorValue: React.Dispatch<React.SetStateAction<ColorValue>>;
  modalType: string;
  error: boolean;
}

function ColorInput({
  colorValue,
  setColorValue,
  modalType,
  error,
}: ColorInputProps) {
  const { budgets } = useBudgetsStore((state) => state);
  const { pots } = usePotsStore((state) => state);
  const { bills } = useBillsStore((state) => state);
  const colorData =
    modalType === "budget" ? budgets : modalType === "pots" ? pots : bills;
  const currentThemeColors = colorData.map((item) => item.theme);

  return (
    <DropdownMenu>
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-gray-500">Theme</span>
        {error && (
          <span className="text-red-500 text-xs font-bold">
            Color must be selected
          </span>
        )}
      </div>
      <DropdownMenuTrigger
        className={`border ${
          error ? "border-red-500" : "border-gray-500"
        } rounded-lg w-full text-left px-4 py-3 flex justify-between items-center mt-1 mb-6`}
      >
        <div className="flex items-center gap-4">
          {colorValue.hexValue ? (
            <>
              <ColoredCircle color={colorValue.hexValue} />
              {colorValue.label}
            </>
          ) : (
            <span className="text-gray-500">Select Color</span>
          )}
        </div>
        <ChevronDown size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        className="max-h-96 overflow-y-scroll min-w-96 border-2 border-gray-400"
        hideWhenDetached
      >
        {colorSelections.map((item) => (
          <DropdownItem
            key={item.hexValue}
            label={item.title}
            setColorValue={() =>
              setColorValue({ label: item.title, hexValue: item.hexValue })
            }
            colorHex={item.hexValue}
            currentThemeColors={currentThemeColors}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const DropdownItem = ({
  label,
  setColorValue,
  colorHex,
  currentThemeColors,
}: {
  label: string;
  setColorValue: React.Dispatch<SetStateAction<string>>;
  colorHex: string;
  currentThemeColors: string[];
}) => {
  const disabled = currentThemeColors.includes(colorHex);
  return (
    <>
      <DropdownMenuItem
        onSelect={() => setColorValue(label)}
        className="px-4 py-2 hover:cursor-pointer hover:bg-slate-100"
        disabled={disabled}
      >
        <div className="flex justify-between items-center w-full">
          <span className={`${disabled && "line-through"}`}>{label}</span>

          <div className="flex items-center gap-4">
            {disabled && (
              <span className="text-[10px] text-red-600 font-bold tracking-wide">
                THEME IN USE
              </span>
            )}
            <ColoredCircle color={colorHex} />
          </div>
        </div>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
    </>
  );
};

export default ColorInput;
