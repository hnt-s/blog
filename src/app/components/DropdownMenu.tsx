"use client"

import { useState, useEffect, useRef} from "react"
import Link from "next/link"

export default function DropdownMenu(){
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);//メニューの参照を作成

    const handleClickOutside = (event: MouseEvent) => {
        //メニューが開いているとき、クリックした場所がメニューの外側ならメニューを閉じる
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        //クリックした場所がメニューの外側ならメニューを閉じる
        document.addEventListener("mousedown", handleClickOutside);
        return () =>{
            //クリーンアップ
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="dark:text-white sm:hidden relative inline-block text-left">
            <button aria-label="Toggle Menu" className="hover:text-sky-600" onClick={() =>setIsOpen(!isOpen)}>
                <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
                    <path 
                        fillRule="evenodd" 
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule={"evenodd"}
                    />
                </svg>
            </button>
            <div 
                ref={menuRef} 
                className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-out transform 
                ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none hidden"}`}
                style={{ overflow: isOpen ? "visible" : "hidden" }}
            >
                <Link href="/" className="block px-4 py-2 text-gray-600 font-medium hover:text-sky-600" onClick={() => setIsOpen(false)}>Home</Link>
                <Link href="/blog" className="block px-4 py-2 text-gray-600 font-medium hover:text-sky-600" onClick={() => setIsOpen(false)}>Blog</Link>
                <Link href="/tag" className="block px-4 py-2 text-gray-600 font-medium hover:text-sky-600" onClick={() => setIsOpen(false)}>Tags</Link>
                <Link href="/about" className="block px-4 py-2 text-gray-600 font-medium hover:text-sky-600" onClick={() => setIsOpen(false)}>About</Link>
            </div>
        </div>
    )
}