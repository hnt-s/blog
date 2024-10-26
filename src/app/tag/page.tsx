import Link from "next/link";
import getPosts from "../../actions/getpost";
import { PostType } from "../../actions/getpost";

export default async function Tags(){
    const posts = await getPosts();

    //タグの数をカウント
    const tagCount = posts.reduce((acc: Record<string, number>, post: PostType)=>{
        post.tags.forEach((tag:string)=>{
            acc[tag] = (acc[tag] || 0) + 1; //重複でカウント
        });
        return acc;
    }, {});

    return (
        <main>
            <div className="flex justify-center border-b border-gray-200 items-center p-3">
                <h1 className="text-3xl font-semibold leading-9 text-center">Tags</h1>
            </div>
            <ul style={{listStyle: "none"}} className="pt-5 p-5">
                {Object.entries(tagCount).map(([tag, count])=>(
                    <li key={tag} className="inline-block p-2">
                        <Link href={`/tag/${tag}`} className="text-blue-500 hover:text-blue-700">{tag}</Link>
                        <p style={{display: "inline"}}> ({count})</p>
                    </li>
                ))}
            </ul>
        </main>
    )
}