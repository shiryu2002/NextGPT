import React, { useState } from "react";
import { SidebarData } from "./SidebarData";
import styles from "./Sidebar.module.css";
import Head from "next/head";
import { useRouter } from "next/router";

function Sidebar() {
  const router = useRouter();
  const [samePath, setSamePath] = useState(false);
  return (
    <div>
      <Head>
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <meta name="mobile-web-app-capable" content="yes"></meta>
        {/* router.pathでSidebarDataから検索*/}
        {SidebarData.map((val, key) => {
          if (router.pathname == val.path) {
            return <title key={key}>{val.title} : わからせンクラテス！</title>;
          }
        })}
        <link rel="icon" href="/Ncrates.png" />
      </Head>
      <ul className={styles.sidebar}>
        {SidebarData.map((val, key) => {
          return (
            <div className="bg-gradient-to-r from-gray-900 to-black" key={key}>
              <li
                onClick={() => {
                  router.push({
                    pathname: val.path,
                    query: { ...router.query },
                  });
                }}
                key={key}
                className={`
                ${router.pathname == val.path && "ring-4 ring-blue-500 ring-offset-2"}
                md:m-4 lg:m-4 
                object-center
                flex flex-row justify-center items-center 
                lg:justify-around lg:text-xl
                lg:p-6 
                hover:shadow-2xl py-4 rounded-2xl cursor-pointer ${
                  router.pathname == val.path
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white scale-110 lg:scale-105 -translate-y-2 lg:-translate-y-0 transition-all ease-in-out duration-300 shadow-lg"
                    : "hover:bg-gray-800 hover:scale-105 transition-all duration-200"
                }`}
              >
                <div className={`${styles.icon} `}>
                  {/* urlとval.idが一緒なら */}
                  {router.pathname == val.path ? val.selected : val.icon}
                </div>
                {router.pathname != val.path ? (
                  <div className={`${styles.title} ml-4 text-white font-bold`}>
                    {val.title}
                  </div>
                ) : (
                  ""
                )}
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
