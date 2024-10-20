import Link from "next/link";
import getPosts from "./actions/getpost";

export default async function Home() {
  const posts = await getPosts();

  return (
      <main>
        <div className="flex-col flex justify-center items-center p-10">
          <img src="/static/logo.png" alt="logo" className="w-40 h-40 rounded" />
          <p className="text-3xl dark:text-white font-semibold leading-9 pt-2">Blog Tree</p>
          <p className="text-gray-500 pt-2">読んだ本や学んだ技術をまとめた記録ブログです。</p>
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
