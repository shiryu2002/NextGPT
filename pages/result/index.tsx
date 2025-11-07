import React from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Layout from "../../components/layout/Layout";
import global from "../../styles/global.module.css";
import styles from "./index.module.css";
import { useResult } from "../../hooks/useResults";
import { ConversationEntry } from "../../types";

export default function Result() {
  const router = useRouter();
  const resultId = router.query.resultId as string | undefined;
  const { result, loading, error } = useResult(resultId);

  const playThisOdai = (odaiId: string) => {
    router.push({
      pathname: "/game",
      query: { OdaiId: odaiId },
    });
  };

  // resultのパース
  const conversationList: ConversationEntry[] = result?.result || [];

  return (
    <Layout title="対戦履歴">
      <div className="sm:flex sm:flex-row sm:justify-strech sm:items-center rounded-xl lg:mt-16 ">
        <div className={styles.left}>
          <div className="lg:w-3/4 py-4 lg:p-5 lg:m-4 left text-center bg-white shadow-xl rounded-xl">
            <p
              id="odai"
              className="lg:text-4xl text-2xl lg:mb-4 mb-2 mt-2"
            >
              {error ? "" : "お題:"}
              {loading ? "読み込み中･･･" : error ? error : result?.odai}
            </p>
            <p
              id="odai"
              className="lg:text-2xl text-xl lg:mb-4 mb-2"
            >
              {error ? "" : "NGワード:"}
              {!error && result && result.ng.join(",")}
            </p>
            <span
              id="score"
              className="lg:text-2xl text-xl flex justify-around"
            >
              {error
                ? ""
                : result && result.score > 0
                ? `スコア:${result.score}点`
                : "スコアなし"}
              {error && (
                <div>
                  <span>問い合わせ先:</span>
                  <a
                    href="https://twitter.com/shiryu_dev"
                    className="font-bold text-blue-500 hover:text-blue-400 underline text-xl"
                  >
                    Twitter(X)
                  </a>
                </div>
              )}
            </span>

            <p className="border-gray-800 border shadow-xl rounded-xl my-4 mx-16 px-4 text-xl font-bold text-gray-800 text-center lg:hidden">
              会話履歴
            </p>
            {result && (
              <Button
                variant="contained"
                className="bg-blue-500"
                onClick={() => playThisOdai(result.odaiId)}
              >
                このお題で遊ぶ！
              </Button>
            )}
          </div>
        </div>

        <div className={styles.resultContainer} id="right">
          <div className="hidden lg:block h-2/5 lg:h-1/3" />
          <div className={styles.result}>
            {conversationList.map((entry, key) => (
              <div key={key}>
                {entry.userInput && (
                  <div>
                    <div className="flex flex-row-reverse">
                      <div className="text-xl lg:text-3xl text-right mx-2 px-4 py-1 bg-blue-500 text-white rounded-2xl border-2 border-gray-300">
                        {result?.name}
                      </div>
                    </div>
                    <div className="flex flex-row-reverse ">
                      <div className="relative w-2/3  bg-blue-500 p-4 rounded-2xl border-r-4 border-b-4 mt-1 border-gray-400">
                        <div className="absolute -bottom-0.5 right-11 -mr-3 -mb-3 w-6 h-6 bg-blue-500 transform rotate-45 border-r-2 border-b-2 border-gray-400"></div>
                        <div className="absolute bottom-0 right-11 -mr-3 -mb-3 w-6 h-6 bg-blue-500 transform rotate-45 -z-10"></div>
                        <p
                          className={`text-2xl lg:text-3xl text-left text-white ${
                            entry.userInput.length > 20 ? "text-xl" : "mx-2"
                          } `}
                        >
                          {entry.userInput}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {entry.gptOutput && (
                  <div>
                    <div className="flex">
                      <div className="text-xl lg:text-3xl text-left mx-2 px-4 py-1 bg-white rounded-2xl border-2 border-gray-300">
                        GPTくん
                      </div>
                    </div>
                    <div className="flex">
                      <div className="relative w-2/3  bg-white p-4 rounded-2xl shadow-xl border-l-4 border-b-4 mt-1 border-gray-400">
                        <div className="absolute -bottom-0.5 left-11 -mr-3 -mb-3 w-6 h-6 bg-white transform rotate-45 border-r-2 border-b-2 border-gray-400"></div>
                        <div className="absolute bottom-0 left-11 -mr-3 -mb-3 w-6 h-6 bg-white transform rotate-45 shadow-xl -z-10"></div>
                        <p
                          className={`text-gray-800 text-xl lg:text-3xl text-left ${
                            entry.gptOutput.length > 20 ? "text-2xl" : "mx-2"
                          } `}
                        >
                          {entry.gptOutput}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="lg:hidden h-1/3" />

          <div id="result"></div>
        </div>
      </div>
    </Layout>
  );
}
