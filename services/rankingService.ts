/**
 * ランキングサービス
 */

import { apiClient } from "../lib/api/client";
import { Ranking, AddRankRequest } from "../types";

/**
 * ランキングを取得
 */
export async function fetchRanking(): Promise<Ranking[]> {
  return apiClient.get<Ranking[]>("/api/getRanking");
}

/**
 * ランキングに登録
 */
export async function addRanking(request: AddRankRequest): Promise<Ranking> {
  return apiClient.post<Ranking>("/api/addRank", request);
}
