// app/api/roulette/route.ts
import {
  createResult,
  deleteResult,
  getAllResults,
} from "@/lib/providers/resultProvider";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const results = await getAllResults();

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch results");
    return NextResponse.json(
      { error: "Failed to fetch results" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { number } = body;

    const validNumber = [
      "00",
      ...Array.from({ length: 37 }, (_, i) => `${i}`),
    ].includes(number);

    // Basic validation
    if (!validNumber) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const response = await createResult({
      number,
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("[ROULETTE_POST]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid ID" },
        { status: 400 }
      );
    }

    const deleted = await deleteResult(id);
    return NextResponse.json(deleted, { status: 200 });
  } catch (error) {
    console.error("[ROULETTE_DELETE]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
