import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const router = useRouter();

  function skipTutorial() {
    if (typeof window !== "undefined") {
      localStorage.setItem("exampleHide", "true");
    }
    router.push("/game");
  }

  return (
    <div className="min-h-screen">
      <Head>
        <title>わからせンクラテス！ ホーム</title>
      </Head>
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-4 py-8 lg:ml-[15vw] min-h-screen">
        {/* Logo Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="relative inline-block">
            <img 
              src="/logo.png" 
              alt="logo" 
              className="w-48 md:w-64 lg:w-80 mx-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-300" 
            />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-6 pb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            わからせンクラテス
          </h1>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>

        {/* Notice */}
        <div className="card max-w-2xl mb-8 bg-blue-50 border-l-4 border-blue-500">
          <p className="text-gray-700 text-sm md:text-base">
            ※製作途中のWebサイトです。デザイン等、完成してない部分が多々ありますがご了承ください。
          </p>
        </div>

        {/* Mobile Content */}
        <div className="lg:hidden w-full max-w-2xl">
          <div className="card text-center mb-6">
            <img
              src="/Ncrates.png"
              width={120}
              height={120}
              className="mx-auto mb-6 drop-shadow-lg"
              alt="ソクラテス"
            />
            <div className="text-xl md:text-2xl font-bold leading-relaxed text-gray-800 space-y-2">
              <p>そなたの親友、</p>
              <p>
                <ruby className="text-blue-600">
                  字飛茶<rt className="text-xs">じぴてぃ</rt>
                </ruby>
                はこの私
              </p>
              <p>哲学者ンクラテスが誘拐した。</p>
              <p className="mt-4">親友を返してほしくば</p>
              <p>私が出すお題に答え、</p>
              <p>そなたが知を証明してみせろ。</p>
            </div>
          </div>
        </div>

        {/* Desktop Content */}
        <div className="relative hidden lg:block w-full max-w-4xl">
          <div className="relative">
            <Image
              src="/serif.png"
              alt="serif"
              width={1000}
              height={1000}
              className="rounded-2xl shadow-2xl"
            />
            
            <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-4">
              <button
                className="btn-primary text-lg"
                onClick={() => router.push("/game")}
              >
                🎮 スタート！
              </button>
              <button
                className="btn-secondary text-lg"
                onClick={skipTutorial}
              >
                ⏭️ 説明スキップ
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Bottom CTA */}
        <div className="fixed bottom-20 left-0 right-0 lg:hidden px-4 pb-4 bg-gradient-to-t from-white via-white to-transparent pt-8">
          <div className="text-center space-y-3">
            <p className="text-xl font-bold text-gray-800">ゲーム開始はこちらから</p>
            <div className="flex justify-center animate-bounce">
              <img src=".././hand.png" alt="hand" className="w-12 h-12" />
            </div>
            <div className="flex flex-col gap-3 max-w-sm mx-auto">
              <button
                className="btn-primary w-full text-lg"
                onClick={() => router.push("/game")}
              >
                🎮 スタート！
              </button>
              <button
                className="btn-secondary w-full text-lg"
                onClick={skipTutorial}
              >
                ⏭️ 説明スキップ
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
