import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import markdownToHtml from 'zenn-markdown-html';

// Markdownファイルが保存されているディレクトリのパス
const postsDirectory = path.join(process.cwd(), 'src/app/posts');



// 指定されたIDの投稿を取得
const getPostById = async(id: string) => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Gray-matterでメタデータとコンテンツを取得
  const { data, content } = matter(fileContents);

  //markdownをHTMLに変換
  const contentHtml = await markdownToHtml(content);

  return {
    id,
    title: data.title,
    date: data.date,
    tags: data.tags,
    contentHtml,
  };
}

export default async function PostDetail({params}: {params: {id: string}}) {
    const post = await getPostById(params.id);
    
    return (
        <main className="pt-10 p-10">
            <p className="text-sm pb-2">{post.date}</p>
            <h1 className="flex text-3xl font-semibold leading-9">{post.title}</h1>
            <div className="px-3 prose dark:prose-dark mt-6 text-gray-600" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </main>
    )
}