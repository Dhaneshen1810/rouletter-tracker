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
import { Result } from "@prisma/client";

interface RouletteQuadrantChartProps {
  spins: Result[];
}

// Quadrant mapping for an American roulette wheel (clockwise split)
const quadrantMap: Record<string, "Q1" | "Q2" | "Q3" | "Q4"> = {
  "27": "Q1",
  "10": "Q1",
  "25": "Q1",
  "29": "Q1",
  "12": "Q1",
  "8": "Q1",
  "19": "Q1",
  "31": "Q1",
  "18": "Q2",
  "6": "Q2",
  "21": "Q2",
  "33": "Q2",
  "16": "Q2",
  "4": "Q2",
  "23": "Q2",
  "35": "Q2",
  "14": "Q2",
  "2": "Q2",
  "0": "Q2",
  "28": "Q3",
  "9": "Q3",
  "26": "Q3",
  "30": "Q3",
  "11": "Q3",
  "7": "Q3",
  "20": "Q3",
  "32": "Q3",
  "17": "Q3",
  "5": "Q4",
  "22": "Q4",
  "34": "Q4",
  "15": "Q4",
  "3": "Q4",
  "24": "Q4",
  "36": "Q4",
  "13": "Q4",
  "1": "Q4",
  "00": "Q4",
};

const QUADRANT_COLORS = {
  Q1: "#8884d8", // Purple
  Q2: "#82ca9d", // Green
  Q3: "#ffc658", // Yellow
  Q4: "#d0ed57", // Light Green
};

// Define the numbers for each quadrant
const QUADRANT_NUMBERS = {
  Q1: [27, 10, 25, 29, 12, 8, 19, 31],
  Q2: [18, 6, 21, 33, 16, 4, 23, 35, 14, 2, "0"],
  Q3: [28, 9, 26, 30, 11, 7, 20, 32, 17],
  Q4: [5, 22, 34, 15, 3, 24, 36, 13, 1, "00"],
};

export default function RouletteQuadrantChart({
  spins,
}: RouletteQuadrantChartProps) {
  const totalSpins = spins.length;

  const quadrantCounts: Record<"Q1" | "Q2" | "Q3" | "Q4", number> = {
    Q1: 0,
    Q2: 0,
    Q3: 0,
    Q4: 0,
  };

  spins.forEach((spin) => {
    const quadrant = quadrantMap[spin.number];
    if (quadrant) {
      quadrantCounts[quadrant]++;
    }
  });

  const quadrantData = Object.entries(quadrantCounts).map(([name, count]) => ({
    name,
    value: totalSpins > 0 ? (count / totalSpins) * 100 : 0, // Percentage
    count, // Raw count for table
  }));

  const formatPercentage = (value: number) => value.toFixed(2) + "%";

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Roulette Quadrant Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start">
          {/* Chart Section */}
          <div className="flex-1 flex justify-center">
            {totalSpins === 0 ? (
              <p className="text-gray-500">
                No spins to display quadrant chart.
              </p>
            ) : (
              <ChartContainer
                config={{
                  Q1: { label: "Quadrant 1", color: QUADRANT_COLORS.Q1 },
                  Q2: { label: "Quadrant 2", color: QUADRANT_COLORS.Q2 },
                  Q3: { label: "Quadrant 3", color: QUADRANT_COLORS.Q3 },
                  Q4: { label: "Quadrant 4", color: QUADRANT_COLORS.Q4 },
                }}
                className="h-[300px] w-full max-w-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={quadrantData}
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
                      {quadrantData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            QUADRANT_COLORS[
                              entry.name as keyof typeof QUADRANT_COLORS
                            ]
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
            {Object.entries(QUADRANT_NUMBERS).map(([quadrant, numbers]) => (
              <div key={quadrant}>
                <h4
                  className="font-semibold text-md mb-2"
                  style={{
                    color:
                      QUADRANT_COLORS[quadrant as keyof typeof QUADRANT_COLORS],
                  }}
                >
                  {quadrant}: Quadrant {quadrant.slice(1)} Numbers
                </h4>
                <div className="flex flex-wrap gap-1">
                  {numbers.map((num) => (
                    <span
                      key={num}
                      className="inline-block px-2 py-1 text-xs font-medium text-white rounded"
                      style={{
                        backgroundColor:
                          QUADRANT_COLORS[
                            quadrant as keyof typeof QUADRANT_COLORS
                          ],
                      }}
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full overflow-x-auto mt-4">
          <h3 className="font-semibold text-lg mb-2">Quadrant Hit Counts</h3>
          {totalSpins === 0 ? (
            <p className="text-gray-500">
              No spins to display quadrant counts.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quadrant</TableHead>
                  <TableHead>Hits</TableHead>
                  <TableHead>Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quadrantData.map((data) => (
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
