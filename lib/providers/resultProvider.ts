// lib/providers/resultProvider.ts
import { prisma } from "@/lib/prisma";

export async function getAllResults() {
  return await prisma.result.findMany();
}

export async function createResult({ number }: { number: string }) {
  return await prisma.result.create({
    data: {
      number,
    },
  });
}

export async function deleteResult(id: string) {
  try {
    return await prisma.result.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting result:", error);
    throw new Error("Result not found or could not be deleted.");
  }
}
