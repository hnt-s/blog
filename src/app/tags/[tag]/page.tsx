import Link from "next/link";
import { getTagPosts } from "@/actions/blog";

interface PostType {
    params: {
        tag: string;
    }
}

export default async function TagPage({params}: PostType) {
    const { tag } = params
    const decodedTag = decodeURIComponent(tag); // デコード処理

    //タグによる絞り込み
    const { success, blogs } = await getTagPosts({tags: decodedTag});
    if(!success) {
        return (
            <div className="text-center text-sm text-gray-500">
            投稿の取得に失敗しました
            </div>
        )
    }
    if(!blogs) {
        return (
            <div className="text-center text-sm text-gray-500">
            投稿がありません
            </div>
        )
    }

    // 降順にソート
    const sortedBlogs = blogs
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map(blog => ({ ...blog, date: blog.date.substring(0, 10) }));
   
    return (
        <main>
            <div className="flex justify-center items-center p-3 border-b border-gray-200">
                <h1 className="text-3xl font-semibold leading-9">Tag: {decodedTag ? `${decodedTag}` : "none"}</h1>
            </div>
            {sortedBlogs.length > 0 ?(
            sortedBlogs?.map((post, index) => (
                <div key={index}>
                    <div className="h-full flex-col mb-8 justify-center items-center flex">
                        <div className="text-lg font-semibold text-gray-400">
                            <span>{post.date}</span>
                        </div>
                        <Link href={`/blog/${post._id}`} className="text-center px-3 text-2xl font-semibold leading-9 hover:text-sky-600 hover:underline">{post.title}</Link>
                        <p className="px-3">{post.description}</p>
                        <div>
                            {post.tags.map((tag: string, idx: number) => (
                                <Link href={`/tags/${tag}`} key={idx} className="text-blue-500 hover:text-blue-700 hover:underline">#{tag} </Link>
                            ))}
                        </div>
                    </div>
                </div>
                ))
                ):(<p>No posts found.</p>)}
        </main>
    )
}