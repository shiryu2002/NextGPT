/**
 * ゲームサービス
 */

import { apiClient } from "../lib/api/client";
import { JudgeApiRequest, JudgeApiResponse } from "../types";

/**
 * ユーザーの入力を判定
 */
export async function judgeUserInput(
  request: JudgeApiRequest
): Promise<string> {
  const response = await apiClient.post<JudgeApiResponse>("/api/judge", request);
  return response.result;
}
