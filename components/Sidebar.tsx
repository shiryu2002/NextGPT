import React from "react";
import { SidebarData } from "./SidebarData";
import styles from "./Sidebar.module.css";
import Head from "next/head";
import { useRouter } from "next/router";

function Sidebar() {
  const router = useRouter();

  return (
    <div>
      <Head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        {SidebarData.map((val) => {
          if (router.pathname === val.path) {
            return <title key={val.id}>{val.title} : わからせンクラテス！</title>;
          }
          return null;
        })}
        <link rel="icon" href="/Ncrates.png" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <ul className={styles.sidebar}>
        {SidebarData.map((val) => {
          const isActive = router.pathname === val.path;
          return (
            <div className="bg-black" key={val.id}>
              <li
                onClick={() => {
                  router.push({
                    pathname: val.path,
                    query: { ...router.query },
                  });
                }}
                className={`
                ${isActive && "border-4 border-gray-800"}
                md:m-4 lg:m-4 
                object-center
                flex flex-row justify-center items-center 
                lg:justify-around lg:text-xl
                lg:p-6 
                hover:shadow-2xl py-4 rounded-full ${
                  isActive
                    ? "bg-white text-black scale-125 lg:scale-100 -translate-y-2 lg:-translate-y-0 transition ease-in-out duration-500"
                    : " "
                }`}
              >
                <div className={styles.icon}>
                  {isActive ? val.selected : val.icon}
                </div>
                {!isActive && (
                  <div className={`${styles.title} ml-4 text-white font-bold`}>
                    {val.title}
                  </div>
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
