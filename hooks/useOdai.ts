/**
 * お題を扱うカスタムフック
 */

import { useState, useEffect } from "react";
import { Odai } from "../types";
import {
  fetchOdaiList,
  fetchRandomOdai,
  fetchSpecificOdai,
} from "../services/odaiService";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../lib/utils/localStorage";

/**
 * お題一覧を取得するフック
 */
export function useOdaiList() {
  const [odaiList, setOdaiList] = useState<Odai[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadOdaiList = async () => {
    try {
      setLoading(true);
      const cached = getFromLocalStorage<Odai[]>("odaiList");
      if (cached) {
        setOdaiList(cached);
      }

      const data = await fetchOdaiList();
      setOdaiList(data);
      setToLocalStorage("odaiList", data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch odai list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOdaiList();
  }, []);

  return { odaiList, loading, error, refresh: loadOdaiList };
}

/**
 * 特定のお題を取得するフック
 */
export function useSpecificOdai(id: string | number | undefined) {
  const [odai, setOdai] = useState<Odai | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const loadOdai = async () => {
      try {
        setLoading(true);
        const data = await fetchSpecificOdai(id);
        setOdai(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch specific odai"
        );
      } finally {
        setLoading(false);
      }
    };

    loadOdai();
  }, [id]);

  return { odai, loading, error };
}

/**
 * ランダムなお題を取得するフック
 */
export function useRandomOdai() {
  const [odai, setOdai] = useState<Odai | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRandomOdai = async () => {
    try {
      setLoading(true);
      const data = await fetchRandomOdai();
      setOdai(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch random odai");
    } finally {
      setLoading(false);
    }
  };

  return { odai, loading, error, loadRandomOdai };
}
