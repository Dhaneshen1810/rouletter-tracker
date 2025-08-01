"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pie, PieChart, ResponsiveContainer, Cell, Legend } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getWheelHalf } from "@/lib/roulette-utils";
import { Result } from "@prisma/client";

interface RouletteHalfChartProps {
  spins: Result[];
}

const HALF_COLORS = {
  "Half 1": "#3b82f6", // Blue
  "Half 2": "#f97316", // Orange
};

// Define the numbers for each half
const HALF_1_NUMBERS = [
  1, 13, 36, 24, 3, 15, 34, 22, 5, 17, 32, 20, 7, 11, 30, 26, 9, 28,
];
const HALF_2_NUMBERS = [
  2, 14, 35, 23, 4, 16, 33, 21, 6, 18, 31, 19, 8, 10, 29, 25, 12, 27,
];

export default function RouletteHalfChart({ spins }: RouletteHalfChartProps) {
  // Filter out 0 and 00 for this specific chart
  const filteredSpins = spins.filter(
    (spin) => spin.number !== "0" && spin.number !== "00"
  );
  const totalFilteredSpins = filteredSpins.length;

  const halfCounts: Record<"Half 1" | "Half 2", number> = {
    "Half 1": 0,
    "Half 2": 0,
  };

  filteredSpins.forEach((spin) => {
    const half = getWheelHalf(spin.number);
    if (half !== "None") {
      halfCounts[half]++;
    }
  });

  const halfData = Object.entries(halfCounts).map(([name, count]) => ({
    name,
    value: totalFilteredSpins > 0 ? (count / totalFilteredSpins) * 100 : 0, // Percentage
    count, // Raw count for table
  }));

  const formatPercentage = (value: number) => value.toFixed(2) + "%";

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Roulette Wheel Halves Breakdown (Excluding 0/00)</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start">
          {/* Chart Section */}
          <div className="flex-1 flex justify-center">
            {totalFilteredSpins === 0 ? (
              <p className="text-gray-500">
                No spins (excluding 0/00) to display half chart.
              </p>
            ) : (
              <ChartContainer
                config={{
                  "Half 1": { label: "Half 1", color: HALF_COLORS["Half 1"] },
                  "Half 2": { label: "Half 2", color: HALF_COLORS["Half 2"] },
                }}
                className="h-[300px] w-full max-w-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={halfData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {halfData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            HALF_COLORS[entry.name as keyof typeof HALF_COLORS]
                          }
                        />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}
          </div>

          {/* Numbers Section */}
          <div className="flex-shrink-0 w-full lg:w-64 space-y-4">
            <div>
              <h4
                className="font-semibold text-md mb-2"
                style={{ color: HALF_COLORS["Half 1"] }}
              >
                H1: Half 1 Numbers
              </h4>
              <div className="flex flex-wrap gap-1">
                {HALF_1_NUMBERS.map((num) => (
                  <span
                    key={num}
                    className="inline-block px-2 py-1 text-xs font-medium text-white rounded"
                    style={{ backgroundColor: HALF_COLORS["Half 1"] }}
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4
                className="font-semibold text-md mb-2"
                style={{ color: HALF_COLORS["Half 2"] }}
              >
                H2: Half 2 Numbers
              </h4>
              <div className="flex flex-wrap gap-1">
                {HALF_2_NUMBERS.map((num) => (
                  <span
                    key={num}
                    className="inline-block px-2 py-1 text-xs font-medium text-white rounded"
                    style={{ backgroundColor: HALF_COLORS["Half 2"] }}
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto mt-4">
          <h3 className="font-semibold text-lg mb-2">Half Hit Counts</h3>
          {totalFilteredSpins === 0 ? (
            <p className="text-gray-500">
              No spins (excluding 0/00) to display half counts.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Half</TableHead>
                  <TableHead>Hits</TableHead>
                  <TableHead>Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {halfData.map((data) => (
                  <TableRow key={data.name}>
                    <TableCell className="font-medium">{data.name}</TableCell>
                    <TableCell>{data.count}</TableCell>
                    <TableCell>{formatPercentage(data.value)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
