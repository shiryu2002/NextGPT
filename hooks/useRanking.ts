/**
 * ランキングを扱うカスタムフック
 */

import { useState, useEffect } from "react";
import { Ranking } from "../types";
import { fetchRanking } from "../services/rankingService";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../lib/utils/localStorage";

export function useRanking(autoRefreshInterval?: number) {
  const [ranking, setRanking] = useState<Ranking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRanking = async () => {
    try {
      const cached = getFromLocalStorage<Ranking[]>("rankingData");
      if (cached) {
        setRanking(cached);
      }

      const data = await fetchRanking();
      setRanking(data);
      setToLocalStorage("rankingData", data);
      setError(null);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch ranking");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRanking();

    if (autoRefreshInterval) {
      const interval = setInterval(() => {
        loadRanking();
      }, autoRefreshInterval);

      return () => clearInterval(interval);
    }
  }, [autoRefreshInterval]);

  return { ranking, loading, error, refresh: loadRanking };
}
