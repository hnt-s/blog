import Link from "next/link"
import Image from "next/image"
import { getPostList } from "@/actions/blog";

export default async function Admin() {
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
        <div>
            <div className="flex flex-col sm:flex-row justify-center border-b border-gray-200 items-center p-3">
                <h1 className="text-3xl font-semibold leading-9 text-center mb-3 sm:mb-0">Blog Tree 管理者ページ</h1>
                <div className="flex justify-center lg:justify-start sm:absolute lg:right-60 sm:right-5">
                    <Link href={"/admin/create"} className="font-bold text-2xl outline rounded px-1 ">
                        ＋
                    </Link>
                </div>
            </div>
            {sortedBlogs.length > 0 ?(
            sortedBlogs.map((post, index) => (
                <div key={index} className="h-full flex flex-col items-center mb-8 text-center lg:px-40 mt-4 px-3 justify-center">
                    <div>
                        <div className="text-lg font-semibold text-gray-400">
                            <span>{post.date}</span>
                        </div>
                        <Link href={`/blog/${post._id}`} className="text-2xl font-semibold leading-9 hover:text-sky-600 hover:underline">
                            {post.title}
                        </Link>
                        <p>{post.description}</p>
                        <div>
                            {post.tags.map((tag: string, idx: number) => (
                                <Link href={`/tag/${tag}`} key={idx} className="text-blue-500 font-Italic hover:text-blue-700 hover:underline">#{tag} </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center lg:absolute lg:right-56 right-5 mt-4 lg:mt-0">
                        <Link href={`/admin/update/${post._id}`}>
                            <Image src="/static/edit.jpg" alt="edit" width={28} height={28} />
                        </Link>
                        <Link href={`/admin/delete/${post._id}`} className="ml-2">
                            <Image src="/static/delete.jpg" alt="delete" width={30} height={30} />
                        </Link>
                    </div>
                </div>
                ))
                ):(<p>No posts found.</p>)}
        </div>
    );
}