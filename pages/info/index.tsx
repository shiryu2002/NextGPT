import React, { useState } from "react";
import Link from "next/link";
import Layout from "../../components/layout/Layout";
import Loading from "../../components/ui/Loading";
import style from "./index.module.css";
import { useComments } from "../../hooks/useComments";

export default function Info() {
  const [comment, setComment] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [commentSending, setCommentSending] = useState<boolean>(false);

  const { comments, loading, submitComment } = useComments(1000 * 10); // 10秒ごとに更新

  const linkClass = "underline text-xl mb-2";

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!comment || !name) return;

    setCommentSending(true);
    try {
      const success = await submitComment(comment, name);
      if (success) {
        setComment("");
        setName("");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCommentSending(false);
    }
  };

  return (
    <Layout title="インフォ">
      <Link
        href="https://docs.google.com/forms/d/e/1FAIpQLSemiDqYvX0xdvpSG4-m4JiSsv6ab1ilSJ7as15fWfvjq4CZzA/viewform"
        className={linkClass}
      >
        <span className="text-2xl lg:text-3xl  text-red-500 font-bold">
          アンケートの回答はこちら
        </span>
      </Link>
      <Link href="/github" className={linkClass}>
        <p className={style.mainText}>
          バグ報告､機能要望､改善案
          <br />
          はこちら
          <span className="text-sm">(Github)</span>
        </p>
      </Link>
      <Link href="/aboutGPT" className={linkClass}>
        <p className={style.mainText}>
          GPT､生成系AI､
          <br />
          プロンプトエンジニアリングとは
        </p>
      </Link>
      <Link
        href="https://twitter.com/shiryu_dev"
        className="underline text-blue-500 text-xl mb-2"
      >
        <p className={style.mainText}>作者の𝕏(旧Twitter)</p>
      </Link>

      <div>
        <form className="flex flex-col">
          <input
            className="border-2 p-1 w-72 lg:w-96"
            placeholder="名前を入力"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <div>
            <input
              className="border-2 p-1 w-60 lg:w-96"
              placeholder="コメントを入力"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <button
              className={`${
                comment === "" || name === ""
                  ? "bg-gray-500"
                  : "bg-blue-500 hover:bg-blue-700"
              } text-white font-bold px-2 py-1 rounded`}
              onClick={(e) => handleSubmit(e)}
              disabled={comment === "" || name === "" || commentSending}
            >
              送信
            </button>
          </div>
        </form>
      </div>

      <div className="text-xl text-center ">
        <div className="font-bold">
          {commentSending ? "送信中･･･" : "コメント欄"}
          <Loading size={20} className={loading ? "" : "opacity-0"} />
        </div>
      </div>

      <div className="overflow-y-scroll h-2/5 lg:h-2/3 bg-gray-100 lg:text-3xl lg:w-2/3 mb-0 lg:mb-4 rounded-2xl">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="border-b-4 border-r-4 m-2 p-2 bg-white rounded-2xl"
          >
            <p className={style.userInfoText}>
              {comment.name}さん{" "}
              <span className={style.time}>
                {new Date(comment.createdAt).toLocaleString("ja-JP")}
              </span>
            </p>
            <p>{comment.comment}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
