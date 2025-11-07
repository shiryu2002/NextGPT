/**
 * 対戦結果サービス
 */

import { apiClient } from "../lib/api/client";
import { Result, SubmitResultRequest } from "../types";

/**
 * 対戦結果を保存
 */
export async function submitResult(
  request: SubmitResultRequest
): Promise<{ id: number }> {
  return apiClient.post<{ id: number }>("/api/submitResult", request);
}

/**
 * 特定の対戦結果を取得
 */
export async function fetchResult(resultId: string | number): Promise<Result> {
  return apiClient.get<Result>(`/api/getResult?resultId=${resultId}`);
}

/**
 * 対戦結果一覧を取得
 */
export async function fetchResultList(): Promise<Result[]> {
  return apiClient.get<Result[]>("/api/getResultList");
}
