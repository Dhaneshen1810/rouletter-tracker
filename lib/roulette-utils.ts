import { Result } from "@prisma/client";

// Define properties for each roulette number (0-36, 00)
export const rouletteNumberProperties = [
  {
    number: "0",
    color: "green",
    parity: "none",
    dozen: "none",
    highLow: "none",
  },
  {
    number: "00",
    color: "green",
    parity: "none",
    dozen: "none",
    highLow: "none",
  },
  {
    number: "1",
    color: "red",
    parity: "odd",
    dozen: "1st 12",
    highLow: "1-18",
  },
  {
    number: "2",
    color: "black",
    parity: "even",
    dozen: "1st 12",
    highLow: "1-18",
  },
  {
    number: "3",
    color: "red",
    parity: "odd",
    dozen: "1st 12",
    highLow: "1-18",
  },
  {
    number: "4",
    color: "black",
    parity: "even",
    dozen: "1st 12",
    highLow: "1-18",
  },
  {
    number: "5",
    color: "red",
    parity: "odd",
    dozen: "1st 12",
    highLow: "1-18",
  },
  {
    number: "6",
    color: "black",
    parity: "even",
    dozen: "1st 12",
    highLow: "1-18",
  },
  {
    number: "7",
    color: "red",
    parity: "odd",
    dozen: "1st 12",
    highLow: "1-18",
  },
  {
    number: "8",
    color: "black",
    parity: "even",
    dozen: "1st 12",
    highLow: "1-18",
  },
  {
    number: "9",
    color: "red",
    parity: "odd",
    dozen: "1st 12",
    highLow: "1-18",
  },
  {
    number: "10",
    color: "black",
    parity: "even",
    dozen: "1st 12",
    highLow: "1-18",
  },
  {
    number: "11",
    color: "black",
    parity: "odd",
    dozen: "1st 12",
    highLow: "1-18",
  },
  {
    number: "12",
    color: "red",
    parity: "even",
    dozen: "1st 12",
    highLow: "1-18",
  },
  {
    number: "13",
    color: "black",
    parity: "odd",
    dozen: "2nd 12",
    highLow: "1-18",
  },
  {
    number: "14",
    color: "red",
    parity: "even",
    dozen: "2nd 12",
    highLow: "1-18",
  },
  {
    number: "15",
    color: "black",
    parity: "odd",
    dozen: "2nd 12",
    highLow: "1-18",
  },
  {
    number: "16",
    color: "red",
    parity: "even",
    dozen: "2nd 12",
    highLow: "1-18",
  },
  {
    number: "17",
    color: "black",
    parity: "odd",
    dozen: "2nd 12",
    highLow: "1-18",
  },
  {
    number: "18",
    color: "red",
    parity: "even",
    dozen: "2nd 12",
    highLow: "1-18",
  },
  {
    number: "19",
    color: "red",
    parity: "odd",
    dozen: "2nd 12",
    highLow: "19-36",
  },
  {
    number: "20",
    color: "black",
    parity: "even",
    dozen: "2nd 12",
    highLow: "19-36",
  },
  {
    number: "21",
    color: "red",
    parity: "odd",
    dozen: "2nd 12",
    highLow: "19-36",
  },
  {
    number: "22",
    color: "black",
    parity: "even",
    dozen: "2nd 12",
    highLow: "19-36",
  },
  {
    number: "23",
    color: "red",
    parity: "odd",
    dozen: "2nd 12",
    highLow: "19-36",
  },
  {
    number: "24",
    color: "black",
    parity: "even",
    dozen: "2nd 12",
    highLow: "19-36",
  },
  {
    number: "25",
    color: "red",
    parity: "odd",
    dozen: "3rd 12",
    highLow: "19-36",
  },
  {
    number: "26",
    color: "black",
    parity: "even",
    dozen: "3rd 12",
    highLow: "19-36",
  },
  {
    number: "27",
    color: "red",
    parity: "odd",
    dozen: "3rd 12",
    highLow: "19-36",
  },
  {
    number: "28",
    color: "black",
    parity: "even",
    dozen: "3rd 12",
    highLow: "19-36",
  },
  {
    number: "29",
    color: "black",
    parity: "odd",
    dozen: "3rd 12",
    highLow: "19-36",
  },
  {
    number: "30",
    color: "red",
    parity: "even",
    dozen: "3rd 12",
    highLow: "19-36",
  },
  {
    number: "31",
    color: "black",
    parity: "odd",
    dozen: "3rd 12",
    highLow: "19-36",
  },
  {
    number: "32",
    color: "red",
    parity: "even",
    dozen: "3rd 12",
    highLow: "19-36",
  },
  {
    number: "33",
    color: "black",
    parity: "odd",
    dozen: "3rd 12",
    highLow: "19-36",
  },
  {
    number: "34",
    color: "red",
    parity: "even",
    dozen: "3rd 12",
    highLow: "19-36",
  },
  {
    number: "35",
    color: "black",
    parity: "odd",
    dozen: "3rd 12",
    highLow: "19-36",
  },
  {
    number: "36",
    color: "red",
    parity: "even",
    dozen: "3rd 12",
    highLow: "19-36",
  },
];

export type RouletteNumberProperty = (typeof rouletteNumberProperties)[number];

export function getRouletteNumberProperties(
  numberStr: string
): RouletteNumberProperty | undefined {
  return rouletteNumberProperties.find((p) => p.number === numberStr);
}

// Quadrant mapping for an American roulette wheel (clockwise split)
export const quadrantMap: Record<string, "Q1" | "Q2" | "Q3" | "Q4"> = {
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

// Define the two halves of the wheel, excluding 0 and 00
const half1Numbers = new Set([
  "1",
  "13",
  "36",
  "24",
  "3",
  "15",
  "34",
  "22",
  "5",
  "17",
  "32",
  "20",
  "7",
  "11",
  "30",
  "26",
  "9",
  "28",
]);

export function getWheelHalf(numberStr: string): "Half 1" | "Half 2" | "None" {
  if (numberStr === "0" || numberStr === "00") {
    return "None";
  }
  if (half1Numbers.has(numberStr)) {
    return "Half 1";
  }
  // Assuming all other numbers 1-36 not in half1Numbers belong to Half 2
  const num = Number.parseInt(numberStr, 10);
  if (num >= 1 && num <= 36) {
    return "Half 2";
  }
  return "None"; // Should not happen with valid roulette numbers
}

export interface RouletteStats {
  totalSpins: number;
  numberFrequencies: Record<string, { count: number; percentage: number }>; // Key is string
  categoryPercentages: {
    red: number;
    black: number;
    green: number;
    odd: number;
    even: number;
    first12: number;
    second12: number;
    third12: number;
    low: number; // 1-18
    high: number; // 19-36
    zeroHits: number; // Combined 0 and 00
  };
}

export function calculateStats(spins: Result[]): RouletteStats {
  const totalSpins = spins.length;

  const numberCounts: Record<string, number> = {};
  rouletteNumberProperties.forEach((prop) => {
    numberCounts[prop.number] = 0;
  });

  let redCount = 0;
  let blackCount = 0;
  let greenCount = 0;
  let oddCount = 0;
  let evenCount = 0;
  let first12Count = 0;
  let second12Count = 0;
  let third12Count = 0;
  let lowCount = 0;
  let highCount = 0;
  let zeroHitsCount = 0; // For 0 or 00

  spins.forEach((spin) => {
    const numStr = spin.number;
    if (numberCounts[numStr] !== undefined) {
      numberCounts[numStr]++;
    }

    const props = getRouletteNumberProperties(numStr);
    if (props) {
      if (props.color === "red") redCount++;
      else if (props.color === "black") blackCount++;
      else if (props.color === "green") greenCount++;

      if (props.parity === "odd") oddCount++;
      else if (props.parity === "even") evenCount++;

      if (props.dozen === "1st 12") first12Count++;
      else if (props.dozen === "2nd 12") second12Count++;
      else if (props.dozen === "3rd 12") third12Count++;

      if (props.highLow === "1-18") lowCount++;
      else if (props.highLow === "19-36") highCount++;

      if (numStr === "0" || numStr === "00") zeroHitsCount++;
    }
  });

  const numberFrequencies: Record<
    string,
    { count: number; percentage: number }
  > = {};
  rouletteNumberProperties.forEach((prop) => {
    numberFrequencies[prop.number] = {
      count: numberCounts[prop.number] || 0,
      percentage:
        totalSpins > 0
          ? ((numberCounts[prop.number] || 0) / totalSpins) * 100
          : 0,
    };
  });

  const getPercentage = (count: number) =>
    totalSpins > 0 ? (count / totalSpins) * 100 : 0;

  return {
    totalSpins,
    numberFrequencies,
    categoryPercentages: {
      red: getPercentage(redCount),
      black: getPercentage(blackCount),
      green: getPercentage(greenCount),
      odd: getPercentage(oddCount),
      even: getPercentage(evenCount),
      first12: getPercentage(first12Count),
      second12: getPercentage(second12Count),
      third12: getPercentage(third12Count),
      low: getPercentage(lowCount),
      high: getPercentage(highCount),
      zeroHits: getPercentage(zeroHitsCount),
    },
  };
}
