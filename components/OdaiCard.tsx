/**
 * お題カードコンポーネント
 */

import { Odai } from "../types";

interface OdaiCardProps {
  odai: Odai;
  onPlay: (id: number) => void;
}

export default function OdaiCard({ odai, onPlay }: OdaiCardProps) {
  return (
    <div className="border-b-4 border-r-4 border-blue-500 p-4 rounded-xl m-2 mx-10 lg:mx-2 ease-in transition-all duration-100 shadow-xl">
      <li>投稿者: {odai.name}さん</li>
      <li>お題: {odai.odai}</li>
      <li>NGワード: {odai.ng.join("､")}</li>
      <li>制限回数: {odai.limit}回</li>
      {odai.official ? (
        <li>公式お題</li>
      ) : (
        <li>ユーザーお題</li>
      )}
      {odai.score ? (
        <li>スコア: {odai.score}</li>
      ) : (
        <li>スコア: 未設定</li>
      )}
      <li>いいね: {odai.like}</li>

      <div className="flex justify-end ">
        <button
          className="button w-40 h-16 bg-blue-500  cursor-pointer select-none
                active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
                active:border-b-[0px]
                transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
                rounded-full  border-[1px] border-blue-400
                
              "
          onClick={() => onPlay(odai.id)}
        >
          <span className="flex flex-col justify-center items-center h-full text-white font-bold text-xl  hover:scale-125">
            Play
          </span>
        </button>
      </div>
    </div>
  );
}
