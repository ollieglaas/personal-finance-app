import React from "react";
import { Cell, Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import useBudgetsStore from "@/hooks/useBudgetsStore";

// const budgetData = data.budgets;

const chartConfig = {
  bills: {
    color: "#ff0000",
  },
} satisfies ChartConfig;

function BudgetsChart() {
  const { budgets } = useBudgetsStore((state) => state);
  const totalMax = budgets.reduce((acc, bill) => acc + bill.maximum, 0);
  const totalPaid = budgets.reduce((acc, bill) => acc + bill.paid, 0);

  return (
    <Card className="flex flex-col border-none shadow-none">
      <CardContent className="flex-1 pb-0 h-[300px]">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={budgets}
              dataKey="maximum"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              {budgets.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.theme} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          ${totalPaid}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          of ${totalMax} limit
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm text-center">
        <div className="flex items-center gap-2 font-medium leading-none">
          A clear view of your allocations <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground text-center">
          Compare your budget spending to your specified limit
        </div>
      </CardFooter>
    </Card>
  );
}

export default BudgetsChart;
