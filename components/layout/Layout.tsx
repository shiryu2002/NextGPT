/**
 * レイアウトコンポーネント
 */

import React from "react";
import Head from "next/head";
import Sidebar from "../Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const pageTitle = title
    ? `${title} : わからせンクラテス！`
    : "わからせンクラテス！";

  return (
    <div className="min-h-screen">
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Sidebar />
      <main className="flex flex-col items-center px-4 py-8 lg:ml-[15vw] lg:py-12 min-h-screen pb-24 lg:pb-8">
        {children}
      </main>
    </div>
  );
}
