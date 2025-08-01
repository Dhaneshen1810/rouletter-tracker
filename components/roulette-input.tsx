"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RouletteInputProps {
  onAddSpin: (number: string) => void;
}

export default function RouletteInput({ onAddSpin }: RouletteInputProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    const trimmedValue = inputValue.trim();
    const num = Number.parseInt(trimmedValue, 10);

    // Validate for "0", "00", or numbers 1-36
    if (trimmedValue === "0" || trimmedValue === "00") {
      setError(null);
      onAddSpin(trimmedValue);
      setInputValue("");
    } else if (num >= 1 && num <= 36 && !isNaN(num)) {
      setError(null);
      onAddSpin(trimmedValue);
      setInputValue("");
    } else {
      setError("Please enter '0', '00', or a number between 1 and 36.");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Card className="w-full max-w-sm sm:max-w-md mx-auto">
      {" "}
      {/* Added mx-auto for centering */}
      <CardHeader>
        <CardTitle>Enter Spin Result</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          {" "}
          {/* Flex-col on small, row on sm+ */}
          <Input
            type="text"
            placeholder="0, 00, or 1-36"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow w-full" // Ensure input takes full width on small screens
            aria-label="Roulette spin result"
          />
          <Button onClick={handleSubmit} className="w-full sm:w-auto">
            {" "}
            {/* Button takes full width on small screens */}
            Add Spin
          </Button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </CardContent>
    </Card>
  );
}
