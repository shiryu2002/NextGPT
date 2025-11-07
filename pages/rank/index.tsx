import Layout from "../../components/layout/Layout";
import Loading from "../../components/ui/Loading";
import styles from "./index.module.css";
import { useRanking } from "../../hooks/useRanking";

export default function Rank() {
  const { ranking, loading } = useRanking(1000 * 60 * 3); // 3分ごとに更新

  return (
    <Layout title="ランキング">
      <div className="card max-w-4xl mx-auto">
        <h1 className="text-3xl lg:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {ranking.length === 0 ? "取得中･･･" : "🏆 RANKING 🏆"}
        </h1>
        <Loading size={20} className={loading ? "opacity-100" : "opacity-0"} />
        <ul className={styles.resultContainer}>
          {ranking.map((item, index) => (
            <li
              key={item.id || index}
              className="card my-4 hover:scale-[1.02] transition-transform duration-200"
            >
              {index + 1 === 1 ? (
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-lg px-4 py-2 font-bold shadow-md">
                    🥇 {index + 1}位
                  </div>
                </div>
              ) : index + 1 === 2 ? (
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 rounded-lg px-4 py-2 font-bold shadow-md">
                    🥈 {index + 1}位
                  </div>
                </div>
              ) : index + 1 === 3 ? (
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg px-4 py-2 font-bold shadow-md">
                    🥉 {index + 1}位
                  </div>
                </div>
              ) : (
                <div className="text-lg font-semibold text-gray-700 mb-2">{index + 1}位</div>
              )}
              <div className="flex justify-between items-center">
                <div>
                  <span className={`${styles.name} text-xl font-bold text-gray-800`}>{item.name}</span>
                  <span className={`${styles.san} text-gray-600`}>さん</span>
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {item.score}点
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
