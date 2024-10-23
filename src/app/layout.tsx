
import "./globals.css"
import Link from "next/link"
import React from "react"
import DropdownMenu from "./components/DropdownMenu"
import DarkModeButton from "./components/DarkModeButton"

export const metadata = {
  title: 'Blog Tree',
  description: 'はじめてブログを作成してみました。',
}

export default function Rootlayout({
  children, //各ページのコンテンツを入れる引数
}: {
  children: React.ReactNode;
}) {

  const isDarkMode = typeof window !== "undefined" && localStorage.getItem("darkmode") === "true";
  return (
    <html lang='ja' className={isDarkMode ? "dark" : ""} >
      <body className="dark:bg-gray-900 text-gray-600 dark:text-gray-900 flex flex-col min-h-screen">
        <div className="flex items-center justify-between pt-10 p-2 lg:pl-48 lg:pr-48 w-full ">
          <Link aria-label="blog tree" href="/" className="flex items-center">
            <img src="/static/logo.png" alt="logo" className="w-12 h-12 rounded" />
            <h1 className="text-2xl dark:text-white font-semibold ml-2">Blog Tree</h1>
          </Link>

          <div className="flex space-x-4 leading-5 text-lg items-center sm:space-x-6">
            <Link className="hidden text-gray-600 font-semibold sm:block dark:text-white" href="/blog">Blog</Link>
            <Link className="hidden text-gray-600 font-semibold sm:block dark:text-white" href="/tag">Tags</Link>
            <Link className="hidden text-gray-600 font-semibold sm:block dark:text-white" href="/about">About</Link>

            <DarkModeButton />
            <DropdownMenu/>
          </div>
        </div>

        <main className="text-gray-600 dark:text-white flex-grow lg:pl-48 lg:pr-48">{children}</main>
        <footer className="text-center">
          <p>&copy; 2024 Blog Tree. All rights reserved.</p>
        </footer>
      </body>
    </html>
  )
}