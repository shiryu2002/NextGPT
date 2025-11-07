/**
 * ゲームロジックを扱うカスタムフック
 */

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GameState, ConversationEntry, Odai } from "../types";
import { judgeUserInput } from "../services/gameService";
import { fetchSpecificOdai, fetchRandomOdai } from "../services/odaiService";
import { fetchRanking, addRanking } from "../services/rankingService";
import { submitResult } from "../services/resultService";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../lib/utils/localStorage";

export function useGame() {
  const router = useRouter();
  const odaiId = router.query.OdaiId;

  const [game, setGame] = useState<GameState>("playing");
  const [userInput, setUserInput] = useState<string>("");
  const [result, setResult] = useState<ConversationEntry[]>([]);
  const [limit, setLimit] = useState<number>(10);
  const [odai, setOdai] = useState<string>("お題を取得中･･･");
  const [NG, setNG] = useState<string[]>(["ちょっとまってね"]);
  const [alert, setAlert] = useState<string>("");
  const [thinking, setThinking] = useState<boolean>(false);
  const [canRegister, setCanRegister] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [ranking, setRanking] = useState<any[]>([]);
  const [userScore, setUserScore] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [resultSaved, setResultSaved] = useState<boolean>(false);
  const [resultId, setResultId] = useState<number>();
  const [submitting, setSubmitting] = useState<boolean>(false);

  // お題の読み込み
  useEffect(() => {
    if (odaiId) {
      loadSpecificOdai(String(odaiId));
    } else {
      loadRandomOdai();
    }
  }, [odaiId]);

  const loadSpecificOdai = async (id: string) => {
    // キャッシュから読み込み
    const cachedOdai = getFromLocalStorage<string>("odai");
    const cachedNG = getFromLocalStorage<string[]>("NG");
    const cachedLimit = getFromLocalStorage<number>("limit");
    const cachedScore = getFromLocalStorage<number>("score");
    
    if (cachedOdai) setOdai(cachedOdai);
    if (cachedNG) setNG(cachedNG);
    if (cachedLimit) setLimit(cachedLimit);
    if (cachedScore) setUserScore(cachedScore);

    try {
      const data = await fetchSpecificOdai(id);
      setOdai(data.odai);
      setNG(data.ng);
      setLimit(data.limit);
      setUserScore(data.score);
      setCount(0);
      
      setToLocalStorage("odai", data.odai);
      setToLocalStorage("NG", data.ng);
      setToLocalStorage("limit", data.limit);
      setToLocalStorage("score", data.score);
    } catch (error) {
      console.error("Failed to load specific odai:", error);
    }
  };

  const loadRandomOdai = async () => {
    try {
      const data = await fetchRandomOdai();
      setOdai(data.odai);
      setNG(data.ng);
      setLimit(data.limit);
      setUserScore(data.score);
      setCount(0);
      setResult([]);
      setGame("playing");
      
      setToLocalStorage("odai", data.odai);
      setToLocalStorage("NG", data.ng);
      setToLocalStorage("limit", data.limit);
      setToLocalStorage("score", data.score);
      
      router.push("/game?OdaiId=" + data.id);
    } catch (error) {
      console.error("Failed to load random odai:", error);
    }
  };

  const checkNGWords = (input: string): boolean => {
    for (let i = 0; i < NG.length; i++) {
      if (NG[i] === "") continue;
      if (input.includes(NG[i]) || input.includes(odai)) {
        setAlert("NGワードが含まれています");
        return true;
      }
    }
    setAlert("");
    return false;
  };

  const onInputChange = (value: string) => {
    setUserInput(value);
    checkNGWords(value);
  };

  const submitUserInput = async () => {
    // エラー処理
    if (userInput.trim().length === 0) {
      setAlert("文字を入力してください");
      return;
    }

    if (checkNGWords(userInput)) {
      return;
    }

    if (limit <= 0) {
      setAlert("もう終わりです");
      return;
    }

    setThinking(true);

    try {
      const response = await judgeUserInput({
        user: userInput,
        odai: odai,
        NG: NG.length === 0 ? "NGワードはありません｡" : NG,
      });

      // お題が含まれていたら勝利
      if (response.includes(odai)) {
        await loadRanking();
        setTimeout(() => {
          setGame("win");
        }, 2000);
      } else {
        setCount(count + 1);
        setUserScore(Math.floor(userScore * ((limit - count - 1) / limit)));
      }

      setResult([...result, { userInput: userInput, gptOutput: response }]);
      setLimit(limit - 1);
      setUserInput("");
    } catch (error) {
      console.error(error);
      setAlert(error instanceof Error ? error.message : "エラーが発生しました");
    } finally {
      setThinking(false);
    }
  };

  const loadRanking = async () => {
    try {
      const data = await fetchRanking();
      const newRanking = data.map((item) => ({
        name: item.name,
        score: item.score,
      }));
      setRanking(newRanking);
      compareRanking(newRanking);
    } catch (error) {
      console.error("Failed to load ranking:", error);
    }
  };

  const compareRanking = (rankingData: any[]) => {
    for (let i = 0; i < rankingData.length; i++) {
      if (userScore > rankingData[i].score) {
        setCanRegister(true);
        return;
      }
    }
    if (userScore === 0) {
      setCanRegister(false);
    }
  };

  const registerRanking = async () => {
    if (!userName || userName.length === 0) return;
    
    try {
      await addRanking({ name: userName, score: userScore });
    } catch (error) {
      console.error("Failed to register ranking:", error);
    }
  };

  const saveResult = async () => {
    setSubmitting(true);
    try {
      const data = await submitResult({
        odai: odai,
        NG: NG,
        playerName: userName,
        odaiId: odaiId ? String(odaiId) : "0",
        result: JSON.stringify(result),
        score: userScore,
        count: count,
      });
      
      await registerRanking();
      setResultSaved(true);
      setResultId(data.id);
    } catch (error) {
      console.error("Failed to save result:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    game,
    userInput,
    result,
    limit,
    odai,
    NG,
    alert,
    thinking,
    canRegister,
    userName,
    userScore,
    count,
    resultSaved,
    resultId,
    submitting,
    setUserName,
    onInputChange,
    submitUserInput,
    loadRandomOdai,
    saveResult,
    loadRanking,
  };
}
