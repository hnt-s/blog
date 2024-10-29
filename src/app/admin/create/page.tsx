'use client'
import { createBlog } from "@/actions/blog"
import Link from "next/link"


const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //デフォルトの送信をキャンセル
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const tags = formData.get('tags') as string;
    const content = formData.get('content') as string;

    //タグをカンマで分割
    const tagArray = tags.split(',').map((tags) => tags.trim());

    //日付を自動取得
    const date = new Date().toISOString(); //ISO形式で取得

    try {
        // ブログ投稿の作成
        await createBlog({ title, description, tags: tagArray, content, date });

        // 成功したら管理者ページにリダイレクト
        window.location.href = '/admin'; 
    } catch (error) {
        console.error("投稿エラー:", error);
    }
}

export default function CreatePosts() {

    return (
        <div>
            <div className="flex justify-center border-b border-gray-200 items-center p-3">
                <h1 className="text-3xl font-semibold leading-9 text-center">新規投稿</h1>
            </div>
            <div className="p-6">
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
                <div>
                        <label className="block text-gray-700">タイトル</label>
                        <input
                            type="text"
                            name="title"
                            required
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">説明</label>
                        <input
                            type="text"
                            name="description"
                            required
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">タグ</label>
                        <input
                            type="text"
                            name="tags"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="ex. javascript, nextjs, ..."
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">内容</label>
                        <textarea
                            name="content"
                            required
                            className="w-full h-80 px-4 py-2 border rounded-md "
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-5 py-1 bg-[#c8f0d8] text-[#00b894] font-semibold leading-9 hover:text-[#216d5d] hover:underline rounded-lg"
                        >
                            投稿
                        </button>
                        <Link href={'/admin'} className="px-5 py-1 bg-[#e4dede] text-gray-500 font-semibold leading-9 hover:text-gray-700 hover:underline rounded-lg ml-3">戻る</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}