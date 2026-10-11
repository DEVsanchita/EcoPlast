import { useEffect, useState } from "react";

const STORAGE_KEY = "ecoplast_bioplastic_experiments_v1";

export function useExperiments() {
  const [experiments, setExperiments] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(experiments));
    } catch {
      // Storage can fail if photos are large/numerous enough to hit the
      // browser's localStorage quota (~5-10MB). We fail silently here;
      // the entry still exists in memory for the current session.
    }
  }, [experiments]);

  const addExperiment = (experiment) => {
    setExperiments((prev) => [
      { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, createdAt: Date.now(), ...experiment },
      ...prev,
    ]);
  };

  const removeExperiment = (id) => {
    setExperiments((prev) => prev.filter((e) => e.id !== id));
  };

  return { experiments, addExperiment, removeExperiment };
}
