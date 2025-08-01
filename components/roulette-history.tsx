"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import {
  getRouletteNumberProperties,
  getWheelHalf,
  quadrantMap,
} from "@/lib/roulette-utils";
import { useState } from "react";
import { Result } from "@prisma/client";

interface RouletteHistoryProps {
  spins: Result[];
  onDeleteSpin: (id: string) => void;
}

type FilterOption = "all" | "last-hour" | "last-2-hours" | "today";

export default function RouletteHistory({
  spins,
  onDeleteSpin,
}: RouletteHistoryProps) {
  const [filter, setFilter] = useState<FilterOption>("all");

  // Filter spins based on selected filter
  const getFilteredSpins = (
    spins: Result[],
    filter: FilterOption
  ): Result[] => {
    const now = new Date();

    switch (filter) {
      case "last-hour":
        const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
        return spins.filter((spin) => new Date(spin.createdAt) >= oneHourAgo);

      case "last-2-hours":
        const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
        return spins.filter((spin) => new Date(spin.createdAt) >= twoHoursAgo);

      case "today":
        const startOfToday = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );
        return spins.filter((spin) => new Date(spin.createdAt) >= startOfToday);

      case "all":
      default:
        return spins;
    }
  };

  const filteredSpins = getFilteredSpins(spins, filter);

  // Group filtered spins by date
  const groupedSpins = filteredSpins.reduce((acc, spin) => {
    const date = new Date(spin.createdAt).toLocaleDateString(); // Get date part
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(spin);
    return acc;
  }, {} as Record<string, Result[]>);

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedSpins).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime();
  });

  return (
    <Card className="w-full max-w-sm sm:max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Spin History</CardTitle>
          <div className="flex items-center gap-2">
            <label htmlFor="filter-select" className="text-sm font-medium">
              Filter:
            </label>
            <Select
              value={filter}
              onValueChange={(value: FilterOption) => setFilter(value)}
            >
              <SelectTrigger className="w-[140px]" id="filter-select">
                <SelectValue placeholder="Select filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="last-hour">Last Hour</SelectItem>
                <SelectItem value="last-2-hours">Last 2 Hours</SelectItem>
                <SelectItem value="today">Today</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredSpins.length === 0 ? (
          <p className="text-gray-500">
            {spins.length === 0
              ? "No spins recorded yet."
              : "No spins found for the selected filter."}
          </p>
        ) : (
          <ScrollArea className="h-96 pr-4">
            {sortedDates.map((date) => (
              <div key={date} className="mb-4">
                <h3 className="text-lg font-semibold mb-2 sticky top-0 bg-background py-1 z-10">
                  {date}
                </h3>
                <ul className="space-y-2">
                  {groupedSpins[date].map((spin: Result) => {
                    const props = getRouletteNumberProperties(spin.number);
                    const colorClass =
                      props?.color === "red"
                        ? "bg-red-500"
                        : props?.color === "black"
                        ? "bg-black text-white"
                        : "bg-green-500";

                    // Get quadrant information
                    const quadrant = quadrantMap[spin.number] || "N/A";

                    // Get half information
                    const half = getWheelHalf(spin.number);
                    const halfDisplay =
                      half === "None"
                        ? "0/00"
                        : half === "Half 1"
                        ? "H1"
                        : "H2";

                    return (
                      <li
                        key={spin.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${colorClass}`}
                          >
                            {spin.number}
                          </div>
                          <span className="text-gray-600 dark:text-gray-400">
                            ({quadrant}, {halfDisplay})
                          </span>
                          <span className="ml-2 text-gray-500 dark:text-gray-400">
                            {new Date(spin.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDeleteSpin(spin.id)}
                          aria-label={`Delete spin ${spin.number}`}
                        >
                          <X className="h-4 w-4 text-gray-500 hover:text-red-500" />{" "}
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
