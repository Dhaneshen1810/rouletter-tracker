import axios from "axios";
import { useEffect } from "react";
import { useResultStore } from "../stores/resultStore";
import { toast } from "sonner";

const useResults = () => {
  const { result, setResult } = useResultStore((state) => state);

  useEffect(() => {
    const getResults = async () => {
      try {
        const response = await axios.get("/api/results");
        const results = response.data;

        console.log({ results });
        setResult(results);
      } catch (error) {
        console.error("[useResults] Failed to fetch results:", error);
        setResult([]);
      }
    };

    getResults();
  }, [setResult]);

  const createEntry = async (newResult: string) => {
    try {
      const response = await axios.post("/api/results", {
        number: newResult,
      });
      const createdResult = response.data;

      return setResult([...(result || []), createdResult]);
    } catch (error) {
      console.error("[useResults] Failed to add result:", error);
      throw error;
    }
  };

  const deleteEntry = async (id: string) => {
    try {
      const prevResult = [...result];
      const newResult = result.filter((r) => r.id !== id);
      setResult(newResult);

      try {
        await axios.delete("/api/results", {
          data: { id },
        });
      } catch (error) {
        console.error("Failed to delete result:", error);
        setResult(prevResult);
        toast.error("Failed to delete result.");
        throw error;
      }
    } catch (error) {
      console.error("Failed to delete result:", error);
      throw error;
    }
  };

  return {
    result,
    createEntry,
    deleteEntry,
  };
};

export default useResults;
