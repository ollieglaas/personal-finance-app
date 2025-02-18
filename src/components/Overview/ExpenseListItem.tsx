import React from "react";

interface ExpenseListItemProps {
  data: {
    name?: string;
    category?: string;
    total?: number;
    target?: number;
    maximum?: number;
    theme?: string;
  };
}

function ExpenseListItem({ data }: ExpenseListItemProps) {
  return (
    <div
      key={data.name}
      className={`w-[50%] flex flex-col justify-between pl-4 border-l-4 rounded`}
      style={{ borderLeftColor: data.theme }}
    >
      <span className="text-gray-400">{data.name || data.category}</span>
      <span className="font-bold">${data.total || data.maximum}</span>
    </div>
  );
}

export default ExpenseListItem;
