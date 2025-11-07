import React, { useState } from "react";
import Link from "next/link";
import Layout from "../../components/layout/Layout";
import Loading from "../../components/ui/Loading";
import { useComments } from "../../hooks/useComments";

export default function Info() {
  const [comment, setComment] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [commentSending, setCommentSending] = useState<boolean>(false);

  const { comments, loading, submitComment } = useComments(1000 * 10); // 10秒ごとに更新

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
      <div className="max-w-4xl mx-auto space-y-6 w-full">
        {/* Links Section */}
        <div className="card space-y-4">
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSemiDqYvX0xdvpSG4-m4JiSsv6ab1ilSJ7as15fWfvjq4CZzA/viewform"
            className="block"
          >
            <div className="p-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-xl transition-shadow duration-200">
              <span className="text-xl lg:text-2xl font-bold">
                📝 アンケートの回答はこちら
              </span>
            </div>
          </Link>
          
          <Link href="/github" className="block">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-xl transition-shadow duration-200">
              <p className="text-lg lg:text-xl font-semibold">
                🐛 バグ報告、機能要望、改善案はこちら
                <span className="text-sm ml-2">(Github)</span>
              </p>
            </div>
          </Link>
          
          <Link href="/aboutGPT" className="block">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:shadow-xl transition-shadow duration-200">
              <p className="text-lg lg:text-xl font-semibold">
                🤖 GPT、生成系AI、プロンプトエンジニアリングとは
              </p>
            </div>
          </Link>
          
          <Link
            href="https://twitter.com/shiryu_dev"
            className="block"
          >
            <div className="p-4 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl hover:shadow-xl transition-shadow duration-200">
              <p className="text-lg lg:text-xl font-semibold">🐦 作者の𝕏(旧Twitter)</p>
            </div>
          </Link>
        </div>

        {/* Comment Form */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            💬 コメントを投稿
          </h2>
          <form className="space-y-4">
            <input
              className="input-field"
              placeholder="名前を入力"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <div className="flex gap-2">
              <input
                className="input-field flex-1"
                placeholder="コメントを入力"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />
              <button
                className={`px-6 py-3 rounded-lg font-bold text-white transition-all duration-200 ${
                  comment === "" || name === ""
                    ? "bg-gray-400 cursor-not-allowed"
                    : "btn-primary"
                }`}
                onClick={(e) => handleSubmit(e)}
                disabled={comment === "" || name === "" || commentSending}
              >
                送信
              </button>
            </div>
          </form>
        </div>

        {/* Comments Section */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {commentSending ? "送信中･･･" : "コメント欄"}
            </h2>
            <Loading size={20} className={loading ? "" : "opacity-0"} />
          </div>

          <div className="space-y-3 max-h-96 lg:max-h-[500px] overflow-y-auto">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="card bg-gradient-to-br from-white to-gray-50"
              >
                <p className="font-semibold text-gray-800 mb-1">
                  {comment.name}さん{" "}
                  <span className="text-sm text-gray-500 font-normal">
                    {new Date(comment.createdAt).toLocaleString("ja-JP")}
                  </span>
                </p>
                <p className="text-gray-700">{comment.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
