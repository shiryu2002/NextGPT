import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import Loading from "../../components/ui/Loading";
import OdaiCard from "../../components/OdaiCard";
import style from "./index.module.css";
import { useOdaiList } from "../../hooks/useOdai";
import { getFromLocalStorage } from "../../lib/utils/localStorage";
import { Odai } from "../../types";

export default function OdaiPage() {
  const router = useRouter();
  const { odaiList, loading } = useOdaiList();
  const [displayedOdai, setDisplayedOdai] = useState<Odai[]>([]);
  const [officialOnly, setOfficialOnly] = useState(false);

  // odaiListが更新されたら、displayedOdaiも更新
  React.useEffect(() => {
    if (odaiList.length > 0) {
      setDisplayedOdai(odaiList);
    }
  }, [odaiList]);

  const playThisOdai = (id: number) => {
    router.push({
      pathname: "/game",
      query: { OdaiId: id },
    });
  };

  const handleOfficialFilterChange = (checked: boolean) => {
    setOfficialOnly(checked);
    if (checked) {
      setDisplayedOdai(odaiList.filter((item) => item.official));
    } else {
      const cached = getFromLocalStorage<Odai[]>("odaiList");
      setDisplayedOdai(cached || odaiList);
    }
  };

  return (
    <Layout title="お題一覧">
      <div className="border-2 border-gray-600 lg:px-32 lg:py-2 lg:mt-8 px-16 py-2 m-2 rounded-xl">
        {odaiList.length === 0 ? <p>お題取得中･･･</p> : <p>お題一覧</p>}
      </div>
      <button
        onClick={() => router.push("/odaiCreate")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        お題投稿フォーム
      </button>
      <Loading
        size={20}
        className={loading && odaiList.length === 0 ? "" : "opacity-0"}
      />

      {/* 公式お題のみを表示するチェックボタン */}
      <div className="flex items-center justify-center">
        <label htmlFor="official" className="text-xl">
          公式お題のみ表示
        </label>
        <input
          type="checkbox"
          id="official"
          className="w-6 h-6 m-2"
          checked={officialOnly}
          onChange={(e) => handleOfficialFilterChange(e.target.checked)}
        />
      </div>

      <ul className={style.odaiContainer}>
        {displayedOdai.map((item) => (
          <OdaiCard key={item.id} odai={item} onPlay={playThisOdai} />
        ))}
      </ul>
    </Layout>
  );
}
