import { useState, useEffect } from "react";

/**
 * Drop-in replacement for useState that persists to localStorage.
 * Handles Date objects by serializing/deserializing them automatically.
 *
 * Usage:
 *   const [goals, setGoals] = useLocalStorage<Goal[]>("tb-goals", []);
 *
 * When you're ready to move to PostgreSQL, swap these back to useState
 * and load from your API instead.
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored === null) return initialValue;
      return JSON.parse(stored, dateReviver);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or unavailable — silent fail
    }
  }, [key, value]);

  return [value, setValue];
}

/**
 * JSON.parse reviver that converts ISO date strings back to Date objects.
 * Matches strings like "2026-07-25T12:00:00.000Z"
 */
function dateReviver(_key: string, value: unknown): unknown {
  if (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)
  ) {
    const date = new Date(value);
    if (!isNaN(date.getTime())) return date;
  }
  return value;
}