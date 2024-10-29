'use client'
import { getPostDetail, deleteBlog } from '@/actions/blog';
import markdownToHtml from 'zenn-markdown-html';
import Link from 'next/link';

interface Context {
    params: {
        id: string
    }
}

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const _id = formData.get('_id') as string;

    try { 
        // 削除処理
        await deleteBlog({_id})

        window.location.href = '/admin';
    } catch(error) {
        console.error("削除エラー:", error);
    }
}

export default async function PostDetail({params}: Context) {
    const { id } = params
    const { success, blog } = await getPostDetail({ id });

    if(!success) {
        return (
            <div className="text-center text-sm text-gray-500">投稿の取得に失敗しました</div>
        )
    }

    if(blog === null) {
        return (
            <div className="text-center text-sm text-gray-500">投稿がありません</div>
        )
    }
    const contentHtml = await markdownToHtml(blog.content);
    return (
        <div>
            <div className='flex flex-col items-center pt-10 w-full container mx-auto px-3'>
                <p className="text-sm pb-2">{blog.date}</p>
                <h1 className="flex text-3xl font-semibold leading-9">{blog.title}：削除確認</h1>
                <div className="prose dark:prose-dark mt-6 mb-10 text-gray-600 " dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </div>

            <p className='text-center'>本当に削除しますか?</p>
            <form onSubmit={handleSubmit} className="flex justify-center space-y-4">
                <input type="hidden" name="_id" value={blog._id} />
                <button
                    type="submit"
                    className='text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-1 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                >
                    削除
                </button>
                <Link href={'/admin'} className="px-5 py-1 bg-[#e4dede] text-gray-500 font-semibold leading-9 hover:text-gray-700 hover:underline rounded-lg ml-3">戻る</Link>
            </form>
        </div>
    )
}