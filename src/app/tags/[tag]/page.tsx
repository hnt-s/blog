import Link from "next/link";
import { getTagPosts } from "@/actions/blog";

interface PostType {
    params: {
        tags: string;
    }
}

export default async function TagPage({params}: PostType) {
    const { tags } = params
    console.log(tags);

    //タグによる絞り込み
    const { success, blogs } = await getTagPosts({tags});
    // const encodedTag = params.tags;
    // const tag = encodedTag.map(post => params.tags).flat();
    // decodeURIComponent(tag);
    console.log(blogs);
    if(!success) {
        return (
            <div className="text-center text-sm text-gray-500">
            投稿の取得に失敗しました
            </div>
        )
    }

    return (
        <main>
            <div className="flex justify-center items-center p-3 border-b border-gray-200">
                <h1 className="text-3xl font-semibold leading-9">Tag: {tags ? `${tags}` : "none"}</h1>
            </div>
            {blogs.length > 0 ?(
            blogs?.map((post, index) => (
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