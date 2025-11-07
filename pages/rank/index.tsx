import Layout from "../../components/layout/Layout";
import Loading from "../../components/ui/Loading";
import styles from "./index.module.css";
import { useRanking } from "../../hooks/useRanking";

export default function Rank() {
  const { ranking, loading } = useRanking(1000 * 60 * 3); // 3分ごとに更新

  return (
    <Layout title="ランキング">
      <span className="border-2 border-gray-600 lg:px-32 lg:py-2 lg:mt-8 px-10 m-2 rounded-xl font-bold text-2xl py-4">
        {ranking.length === 0 ? <p>取得中･･･</p> : <p>RANKING</p>}
      </span>
      <Loading size={20} className={loading ? "opacity-100" : "opacity-0"} />
      <ul className={styles.resultContainer}>
        {ranking.map((item, index) => (
          <li
            key={item.id || index}
            className="border-b-4 border-r-4 border p-2 rounded-2xl my-4"
          >
            {index + 1 === 1 ? (
              <div className="flex px-2 ">
                <div className="bg-yellow-300 rounded px-4">
                  🥇{index + 1}位
                </div>
              </div>
            ) : index + 1 === 2 ? (
              <div className="flex px-2 ">
                <div className="bg-gray-300 rounded px-4">
                  🥈{index + 1}位
                </div>
              </div>
            ) : index + 1 === 3 ? (
              <div className="flex px-2 ">
                <div className="bg-yellow-700 rounded px-4">
                  🥉{index + 1}位
                </div>
              </div>
            ) : (
              <div className="">{index + 1}位</div>
            )}
            <div id="rankContainer" className="">
              <span className={styles.name}>{item.name} </span>
              <span className={styles.san}>さん</span>

              <span className="float-right">{item.score}点</span>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
