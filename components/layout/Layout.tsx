/**
 * レイアウトコンポーネント
 */

import React from "react";
import Head from "next/head";
import Sidebar from "../Sidebar";
import global from "../../styles/global.module.css";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const pageTitle = title
    ? `${title} : わからせンクラテス！`
    : "わからせンクラテス！";

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Sidebar />
      <main className={global.container}>{children}</main>
    </div>
  );
}
