"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type RouletteStats,
  rouletteNumberProperties,
} from "@/lib/roulette-utils";
import {
  Bar,
  BarChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface RouletteStatsProps {
  stats: RouletteStats;
}

const COLORS = {
  red: "#ef4444",
  black: "#000000",
  green: "#22c55e",
  odd: "#8884d8",
  even: "#82ca9d",
  first12: "#ffc658",
  second12: "#a4de6c",
  third12: "#d0ed57",
  low: "#8dd1e1",
  high: "#83a6ed",
};

export default function RouletteStatsDisplay({ stats }: RouletteStatsProps) {
  // Sort number frequencies by numerical value, treating "00" as distinct
  const sortedNumberFrequencies = rouletteNumberProperties
    .map((prop) => ({
      number: prop.number,
      count: stats.numberFrequencies[prop.number]?.count || 0,
      percentage: stats.numberFrequencies[prop.number]?.percentage || 0,
    }))
    .sort((a, b) => {
      if (a.number === "00") return -1; // "00" comes first
      if (b.number === "00") return 1;
      if (a.number === "0") return -1; // "0" comes after "00" but before 1-36
      if (b.number === "0") return 1;
      return Number.parseInt(a.number, 10) - Number.parseInt(b.number, 10);
    });

  const formatPercentage = (value: number) => value.toFixed(2) + "%";

  // Data for Pie Charts
  const colorData = [
    { name: "Red", value: stats.categoryPercentages.red, color: COLORS.red },
    {
      name: "Black",
      value: stats.categoryPercentages.black,
      color: COLORS.black,
    },
    {
      name: "Green (0/00)",
      value: stats.categoryPercentages.green,
      color: COLORS.green,
    },
  ].filter((item) => item.value > 0);

  const parityData = [
    { name: "Odd", value: stats.categoryPercentages.odd, color: COLORS.odd },
    { name: "Even", value: stats.categoryPercentages.even, color: COLORS.even },
  ].filter((item) => item.value > 0);

  const dozenData = [
    {
      name: "1st 12",
      value: stats.categoryPercentages.first12,
      color: COLORS.first12,
    },
    {
      name: "2nd 12",
      value: stats.categoryPercentages.second12,
      color: COLORS.second12,
    },
    {
      name: "3rd 12",
      value: stats.categoryPercentages.third12,
      color: COLORS.third12,
    },
  ].filter((item) => item.value > 0);

  const highLowData = [
    {
      name: "1-18 (Low)",
      value: stats.categoryPercentages.low,
      color: COLORS.low,
    },
    {
      name: "19-36 (High)",
      value: stats.categoryPercentages.high,
      color: COLORS.high,
    },
  ].filter((item) => item.value > 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full max-w-4xl mx-auto">
      {" "}
      {/* Added mx-auto for centering */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Number Frequencies Chart</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.totalSpins === 0 ? (
            <p className="text-gray-500">No spins to display chart.</p>
          ) : (
            <ChartContainer
              config={{
                count: {
                  label: "Count",
                  color: "hsl(var(--primary))",
                },
              }}
              className="h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sortedNumberFrequencies}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="number" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="count"
                    fill="var(--color-count)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown Charts</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Color</h3>
            {stats.totalSpins === 0 ? (
              <p className="text-gray-500">No spins to display chart.</p>
            ) : (
              <ChartContainer
                config={{
                  red: { label: "Red", color: COLORS.red },
                  black: { label: "Black", color: COLORS.black },
                  green: { label: "Green", color: COLORS.green },
                }}
                className="h-[200px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={colorData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {colorData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}
            <p>Red: {formatPercentage(stats.categoryPercentages.red)}</p>
            <p>Black: {formatPercentage(stats.categoryPercentages.black)}</p>
            <p>
              Green (0/00): {formatPercentage(stats.categoryPercentages.green)}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Parity</h3>
            {stats.totalSpins === 0 ? (
              <p className="text-gray-500">No spins to display chart.</p>
            ) : (
              <ChartContainer
                config={{
                  odd: { label: "Odd", color: COLORS.odd },
                  even: { label: "Even", color: COLORS.even },
                }}
                className="h-[200px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={parityData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {parityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}
            <p>Odd: {formatPercentage(stats.categoryPercentages.odd)}</p>
            <p>Even: {formatPercentage(stats.categoryPercentages.even)}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Dozens</h3>
            {stats.totalSpins === 0 ? (
              <p className="text-gray-500">No spins to display chart.</p>
            ) : (
              <ChartContainer
                config={{
                  first12: { label: "1st 12", color: COLORS.first12 },
                  second12: { label: "2nd 12", color: COLORS.second12 },
                  third12: { label: "3rd 12", color: COLORS.third12 },
                }}
                className="h-[200px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dozenData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {dozenData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}
            <p>1st 12: {formatPercentage(stats.categoryPercentages.first12)}</p>
            <p>
              2nd 12: {formatPercentage(stats.categoryPercentages.second12)}
            </p>
            <p>3rd 12: {formatPercentage(stats.categoryPercentages.third12)}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg">High/Low</h3>
            {stats.totalSpins === 0 ? (
              <p className="text-gray-500">No spins to display chart.</p>
            ) : (
              <ChartContainer
                config={{
                  low: { label: "1-18 (Low)", color: COLORS.low },
                  high: { label: "19-36 (High)", color: COLORS.high },
                }}
                className="h-[200px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={highLowData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {highLowData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}
            <p>1-18 (Low): {formatPercentage(stats.categoryPercentages.low)}</p>
            <p>
              19-36 (High): {formatPercentage(stats.categoryPercentages.high)}
            </p>
          </div>

          <div className="space-y-2 col-span-full">
            <h3 className="font-semibold text-lg">Zero Hits</h3>
            <p>
              Zero (0) / Double Zero (00):{" "}
              {formatPercentage(stats.categoryPercentages.zeroHits)}
            </p>
          </div>
          <div className="space-y-2 col-span-full">
            <h3 className="font-semibold text-lg">Total Spins</h3>
            <p>{stats.totalSpins}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
