import { useState, useEffect } from "react";
import { TimelineEntry, timelineData as defaultData } from "@/data/timelineData";

const STORAGE_KEY = "育아-timeline-data";

export function useTimelineData() {
  const [data, setData] = useState<TimelineEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultData;
    } catch {
      return defaultData;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const addEntry = (entry: TimelineEntry) => {
    setData((prev) => [...prev, entry]);
  };

  const updateEntry = (index: number, entry: TimelineEntry) => {
    setData((prev) => prev.map((e, i) => (i === index ? entry : e)));
  };

  const deleteEntry = (index: number) => {
    setData((prev) => prev.filter((_, i) => i !== index));
  };

  const moveEntry = (from: number, direction: "up" | "down") => {
    const to = direction === "up" ? from - 1 : from + 1;
    if (to < 0 || to >= data.length) return;
    setData((prev) => {
      const next = [...prev];
      [next[from], next[to]] = [next[to], next[from]];
      return next;
    });
  };

  const resetToDefault = () => {
    setData(defaultData);
  };

  return { data, addEntry, updateEntry, deleteEntry, moveEntry, resetToDefault };
}
