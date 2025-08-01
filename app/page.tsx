"use client";

import RouletteInput from "@/components/roulette-input";
import useResults from "@/lib/hooks/useResults";

export default function InputPage() {
  const { createEntry } = useResults();

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 md:p-8 min-h-[calc(100vh-100px)] bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-50 justify-center">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
        Roulette Spin Input
      </h1>
      <RouletteInput onAddSpin={createEntry} />
    </div>
  );
}
