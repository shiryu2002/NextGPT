// ゲーム関連の型定義

export type GameState = "win" | "lose" | "playing";

export interface Odai {
  id: number;
  odai: string;
  ng: string[];
  limit: number;
  score: number;
  like: number;
  dislike: number;
  official: boolean;
  name: string;
  createdAt?: Date;
}

export interface ConversationEntry {
  userInput: string;
  gptOutput: string;
}

export interface Ranking {
  id?: number;
  name: string;
  score: number;
  odai?: string;
  createdAt?: Date;
}

export interface Result {
  id: number;
  name: string;
  odaiId: string;
  result: ConversationEntry[];
  score: number;
  odai: string;
  ng: string[];
  count: number;
  createdAt?: Date;
}

export interface Comment {
  id: number;
  name: string;
  comment: string;
  createdAt: Date;
}

// API関連の型定義

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface JudgeApiRequest {
  user: string;
  odai: string;
  NG: string[] | string;
}

export interface JudgeApiResponse {
  result: string;
}

export interface AddOdaiRequest {
  name: string;
  odai: string;
  ngList: string[];
  limit: number;
  score: number;
  official: boolean;
}

export interface SubmitResultRequest {
  odai: string;
  NG: string[];
  playerName: string;
  odaiId: string;
  result: string;
  score: number;
  count: number;
}

export interface AddRankRequest {
  name: string;
  score: number;
}

export interface AddCommentRequest {
  comment: string;
  name: string;
}

// UIコンポーネント関連の型定義

export interface SidebarDataItem {
  id: string;
  title: string;
  icon: React.ReactElement;
  selected: React.ReactElement;
  path: string;
}
