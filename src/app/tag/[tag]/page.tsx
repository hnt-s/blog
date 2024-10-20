import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

//tagでフィルタリングして投稿を取得
async function getTagPosts(tag: string) {
    const postsDirectory = path.join(process.cwd(), "src/app/posts");
    const filenames = fs.readdirSync(postsDirectory);
  
    const posts = await Promise.all(
        filenames.map(async (filename) => {
            //ファイルのフルパスを取得
            const filePath = path.join(postsDirectory, filename);
            const fileContents = fs.readFileSync(filePath, "utf8");
            //data（投稿日等）
            const {data} = matter(fileContents);
            return {
                title: data.title,
                date: data.date,
                tags: data.tags,
                description: data.description,
                id: data.id,
            };
        })
    );
    return posts.filter(post => post.tags.includes(tag)).sort((a, b) => b.id - a.id);
}

export default async function TagPage({params}: {params:{tag: string}}) {
    const encodedTag = params.tag;
    const tag = decodeURIComponent(encodedTag);
    const posts = await getTagPosts(tag);
    return (
        <main>
            <div className="flex justify-between pt-10 pl-10 border-b border-gray-200">
                <h1 className="text-3xl font-semibold leading-9">Tag: {tag ? `${tag}` : "none"}</h1>
            </div>
            {posts.length > 0 ?(
            posts.map((post, index) => (
                <div key={index}>
                    <div className="h-full flex-col items-start mb-8 justify-center items-center flex">
                        <div className="text-lg font-semibold text-gray-400">
                            <span>{post.date}</span>
                        </div>
                        <Link href={`/blog/${post.id}`} className="text-2xl font-semibold leading-9 hover:text-sky-600 hover:underline">{post.title}</Link>
                        <p>{post.description}</p>
                        <div>
                            {post.tags.map((tag: string, idx: number) => (
                                <Link href={`/tag/${tag}`} key={idx} className="text-blue-500 hover:text-blue-700 hover:underline">#{tag} </Link>
                            ))}
                        </div>
                    </div>
                </div>
                ))
                ):(<p>No posts found.</p>)}
        </main>
    )
}