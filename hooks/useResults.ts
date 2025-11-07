/**
 * 対戦結果を扱うカスタムフック
 */

import { useState, useEffect } from "react";
import { Result } from "../types";
import { fetchResult, fetchResultList } from "../services/resultService";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../lib/utils/localStorage";

/**
 * 対戦結果一覧を取得するフック
 */
export function useResultList() {
  const [resultList, setResultList] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadResultList = async () => {
    try {
      setLoading(true);
      const cached = getFromLocalStorage<Result[]>("resultListData");
      if (cached) {
        setResultList(cached);
      }

      const data = await fetchResultList();
      setResultList(data);
      setToLocalStorage("resultListData", data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch result list"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResultList();
  }, []);

  return { resultList, loading, error, refresh: loadResultList };
}

/**
 * 特定の対戦結果を取得するフック
 */
export function useResult(resultId: string | number | undefined) {
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!resultId) {
      setError("IDが不正です!");
      setLoading(false);
      return;
    }

    const loadResult = async () => {
      try {
        setLoading(true);
        const data = await fetchResult(resultId);
        setResult(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch result"
        );
      } finally {
        setLoading(false);
      }
    };

    loadResult();
  }, [resultId]);

  return { result, loading, error };
}
