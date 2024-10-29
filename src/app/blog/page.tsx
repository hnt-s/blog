import Link from "next/link";
import { getPostList } from "@/actions/blog";
  

export default async function Blog() {
    const { success, blogs } = await getPostList();

    if (!success) {
        return (
          <div className="text-center text-sm text-gray-500">
            投稿の取得に失敗しました
          </div>
        )
    }

    // 降順にソート
    const sortedBlogs = blogs
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map(blog => ({ ...blog, date: blog.date.substring(0, 10) }));

    return (
        <main>
            <div className="flex justify-center border-b border-gray-200 items-center p-3">
                <h1 className="text-3xl font-semibold leading-9 text-center">All Posts</h1>
            </div>
            {sortedBlogs.length > 0 ?(
            sortedBlogs.map((post, index) => (
                <div key={index}>
                    <div className="h-full flex-col items-center mb-8 text-center px-3 mt-4 justify-center flex">
                        <div className="text-lg font-semibold text-gray-400">
                            <span>{post.date}</span>
                        </div>
                        <Link href={`/blog/${post._id}`} className="text-2xl font-semibold leading-9 hover:text-sky-600 hover:underline">{post.title}</Link>
                        <p>{post.description}</p>
                        <div>
                            {post.tags.map((tag: string, idx: number) => (
                                <Link href={`/tag/${tag}`} key={idx} className="text-blue-500 font-Italic hover:text-blue-700 hover:underline">#{tag} </Link>
                            ))}
                        </div>
                    </div>
                </div>
                ))
                ):(<p>No posts found.</p>)}
        </main>
    )
}