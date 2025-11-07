/**
 * お題サービス
 */

import { apiClient } from "../lib/api/client";
import { Odai, AddOdaiRequest } from "../types";

/**
 * お題一覧を取得
 */
export async function fetchOdaiList(): Promise<Odai[]> {
  return apiClient.get<Odai[]>("/api/getOdaiList");
}

/**
 * ランダムなお題を取得
 */
export async function fetchRandomOdai(): Promise<Odai> {
  return apiClient.get<Odai>("/api/getRandomOdai");
}

/**
 * 特定のお題を取得
 */
export async function fetchSpecificOdai(id: string | number): Promise<Odai> {
  return apiClient.get<Odai>(`/api/getSpecificOdai?id=${id}`);
}

/**
 * 新しいお題を追加
 */
export async function addOdai(request: AddOdaiRequest): Promise<Odai> {
  return apiClient.post<Odai>("/api/addOdai", request);
}
