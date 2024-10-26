"use client";

import { useState, useEffect } from "react";

export default function DarkModeButton() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // 初期状態をローカルストレージから取得し、存在しない場合は false をデフォルトとする
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("darkmode");
      return savedTheme === "true"; // "true" ならダークモード、それ以外はライトモード
    }
    return false; // デフォルトはライトモード
  });

  useEffect(() => {
    // ダークモードのトグル処理
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkmode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkmode", "false");
    }
  }, [isDarkMode]); // isDarkMode の変更時にのみ動作

  return (
    <div>
      <button
        aria-label="Toggle Dark Mode"
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        {isDarkMode ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 text-yellow-500"
          >
            <path d="M10 15.5A5.5 5.5 0 1110 4.5a5.5 5.5 0 010 11zm0 1.5a7 7 0 100-14 7 7 0 000 14z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
    </button>
    </div>
    
  );
}
