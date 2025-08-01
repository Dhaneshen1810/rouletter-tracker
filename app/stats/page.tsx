"use client";

import RouletteStatsDisplay from "@/components/roulette-stats";
import RouletteQuadrantChart from "@/components/roulette-quadrant-chart";
import RouletteHalfChart from "@/components/roulette-half-chart";
import useResults from "@/lib/hooks/useResults";
import { calculateStats } from "@/lib/roulette-utils";

export default function StatsPage() {
  const { result } = useResults();

  const stats = calculateStats(result);

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 md:p-8 min-h-[calc(100vh-100px)] bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
        Roulette Statistics
      </h1>

      <div className="mb-8 w-full max-w-4xl">
        <RouletteQuadrantChart spins={result} />
      </div>

      {/* New Half Chart component */}
      <div className="mb-8 w-full max-w-4xl">
        <RouletteHalfChart spins={result} />
      </div>

      <RouletteStatsDisplay stats={stats} />
    </div>
  );
}
