'use client'
import React, { useState, useEffect } from 'react';
import { getPostDetail, updateBlog } from '@/actions/blog';
import Link from 'next/link';
import MarkdownPreview from '@/components/MarkdownPreview';

interface Context {
  params: {
      id: string;
  };
}

export default function PostUpdate({params}: Context) {
    const { id } = params;
    const [blog, setBlog] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // 初期データの取得
    useEffect(() => {
        const fetchData = async () => {
            const { success, blog } = await getPostDetail({ id });
            if (success) {
                setBlog(blog);
            } else {
                setError('投稿の取得に失敗しました');
            }
            setLoading(false); // データの取得完了時にロード状態を解除
        }
        fetchData()
    }, [id])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const _id = formData.get('_id') as string;
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const tag = formData.get('tags') as string;
        const content = formData.get('content') as string;

        const tags = tag.split(',').map((tag) => tag.trim());

        try {
            // 更新処理
            await updateBlog({ _id, title, description, tags, content})

            // 成功したら管理者ページにリダイレクト
            window.location.href = '/admin'; 
        } catch (error) {
            console.error("更新エラー:", error);
        }
    }

    if (loading) {
        return <div className="text-center text-sm text-gray-500">読み込み中...</div>
    }

    if (error) {
        return <div className="text-center text-sm text-gray-500">{error}</div>
    }

    if (!blog) {
        return <div className="text-center text-sm text-gray-500">投稿がありません</div>
    }

    return (
        <div>
            <div className="flex justify-center border-b border-gray-200 items-center p-3">
                <h1 className="text-3xl font-semibold leading-9 text-center">{blog.title}：編集</h1>
            </div>
            <div className="p-6">
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
                    <input type="hidden" name='_id' defaultValue={blog._id} />
                    <div>
                        <label className="block text-gray-700">タイトル</label>
                        <input
                            type="text"
                            name="title"
                            required
                            className="w-full px-4 py-2 border rounded-md"
                            defaultValue={blog.title}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">説明</label>
                        <input
                            type="text"
                            name="description"
                            required
                            className="w-full px-4 py-2 border rounded-md"
                            defaultValue={blog.description}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">タグ</label>
                        <input
                            type="text"
                            name="tags"
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="ex. javascript, nextjs, ..."
                            defaultValue={blog.tags}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">内容</label>
                        <textarea
                            name="content"
                            required
                            className="w-full h-80 px-4 py-2 border rounded-md "
                            defaultValue={blog.content}
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-5 py-1 bg-[#c8f0d8] text-[#00b894] font-semibold leading-9 hover:text-[#216d5d] hover:underline rounded-lg"
                        >
                            更新
                        </button>
                        <Link href="/admin" className="px-5 py-1 bg-[#e4dede] text-gray-500 font-semibold leading-9 hover:text-gray-700 hover:underline rounded-lg ml-3">
                            戻る
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
