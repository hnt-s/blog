import Link from "next/link";
import { getPostList } from "@/actions/blog";

export default async function Tags(){
    const { success, blogs } = await getPostList();

    // タグの数をカウント
    const tagCount = blogs.reduce((acc: { [key: string]: number }, post) => {
        post.tags.forEach((tag: string) => {
            const decodedTag = decodeURIComponent(tag); // デコード処理
            acc[decodedTag] = (acc[decodedTag] || 0) + 1; // 重複でカウント
        });
        return acc;
    }, {});

    if (!success) {
        return (
            <div className="text-center text-sm text-gray-500">
                投稿の取得に失敗しました
            </div>
        );
    }

    return (
        <main>
            <div className="flex justify-center border-b border-gray-200 items-center p-3">
                <h1 className="text-3xl font-semibold leading-9 text-center">Tags</h1>
            </div>
            <ul style={{ listStyle: "none" }} className="pt-5 p-5">
                {Object.entries(tagCount).map(([tag, count]) => (
                    <li key={tag} className="inline-block p-2">
                        <Link href={`/tags/${tag}`} className="text-blue-500 hover:text-blue-700">
                            {tag}
                        </Link>
                        <span> ({count})</span>
                    </li>
                ))}
            </ul>
        </main>
    );
}
