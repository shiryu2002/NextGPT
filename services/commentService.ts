/**
 * コメントサービス
 */

import { apiClient } from "../lib/api/client";
import { Comment, AddCommentRequest } from "../types";

/**
 * コメント一覧を取得
 */
export async function fetchComments(): Promise<Comment[]> {
  return apiClient.get<Comment[]>("/api/getComments");
}

/**
 * コメントを追加
 */
export async function addComment(request: AddCommentRequest): Promise<Comment> {
  return apiClient.post<Comment>("/api/addComment", request);
}
