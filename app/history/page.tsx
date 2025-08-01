"use client";

import useResults from "@/lib/hooks/useResults";

import RouletteHistory from "@/components/roulette-history";

export default function HistoryPage() {
  const { result, deleteEntry } = useResults();
  console.log({ result });

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 md:p-8 min-h-[calc(100vh-100px)] bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
        Spin History
      </h1>
      <RouletteHistory spins={result} onDeleteSpin={deleteEntry} />{" "}
    </div>
  );
}
