/**
 * コメントを扱うカスタムフック
 */

import { useState, useEffect } from "react";
import { Comment } from "../types";
import { fetchComments, addComment } from "../services/commentService";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../lib/utils/localStorage";

export function useComments(autoRefreshInterval?: number) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadComments = async () => {
    try {
      const cached = getFromLocalStorage<Comment[]>("commentList");
      if (cached) {
        setComments(cached);
      }

      const data = await fetchComments();
      setComments(data);
      setToLocalStorage("commentList", data);
      setError(null);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch comments");
      setLoading(false);
    }
  };

  const submitComment = async (comment: string, name: string) => {
    try {
      await addComment({ comment, name });
      await loadComments(); // 再読み込み
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add comment");
      return false;
    }
  };

  useEffect(() => {
    loadComments();

    if (autoRefreshInterval) {
      const interval = setInterval(() => {
        loadComments();
      }, autoRefreshInterval);

      return () => clearInterval(interval);
    }
  }, [autoRefreshInterval]);

  return { comments, loading, error, refresh: loadComments, submitComment };
}
