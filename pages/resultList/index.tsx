import React from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Layout from "../../components/layout/Layout";
import Loading from "../../components/ui/Loading";
import style from "./index.module.css";
import { useResultList } from "../../hooks/useResults";

export default function ResultList() {
  const router = useRouter();
  const { resultList, loading } = useResultList();

  const playThisOdai = (id: string) => {
    router.push({
      pathname: "/game",
      query: { OdaiId: id },
    });
  };

  const loadThisResult = (id: number) => {
    router.push({
      pathname: "/result",
      query: { resultId: id },
    });
  };

  return (
    <Layout title="対戦履歴検索">
      {resultList.length === 0 ? (
        <p>対戦履歴データ取得中･･･</p>
      ) : (
        <p>対戦履歴データ</p>
      )}
      <Loading size={20} className={loading ? "opacity-100" : "opacity-0"} />
      <div className={style.resultListContainer}>
        {resultList.map((item) => {
          return (
            <div
              key={item.id}
              className="border-b-4 border-r-4 border p-2 rounded-2xl my-4"
            >
              <p className={style.player}>プレイヤー名</p>
              <p>
                {item.name}
                <span className={style.san}>さん</span>
              </p>
              <p>お題:{item.odai}</p>
              <p>スコア:{item.score}点</p>

              <Button
                variant="contained"
                className="bg-blue-500 mb-2"
                onClick={() => loadThisResult(item.id)}
              >
                この対戦履歴を見る！
              </Button>
              <br />
              <Button
                variant="contained"
                className="bg-blue-500"
                onClick={() => playThisOdai(item.odaiId)}
              >
                このお題で遊ぶ！
              </Button>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
