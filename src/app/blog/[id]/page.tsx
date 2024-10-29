import { getPostDetail } from '@/actions/blog';
import markdownToHtml from 'zenn-markdown-html';

interface Context {
  params: {
      id: string;
  };
}

export default async function PostDetail({params}: Context) {
  const { id } = params
  const { success, blog } = await getPostDetail({ id });

  if (!success) {
      return (
        <div className="text-center text-sm text-gray-500">
          投稿の取得に失敗しました
        </div>
      )
    }
  
  if (blog === null) {
    return (
      <div className="text-center text-sm text-gray-500">投稿がありません</div>
    )
  }
  const contentHtml = await markdownToHtml(blog.content);

  //日付をYYYY/MM/DDに変換
  const date = blog.date.substring(0, 10)

  return (
      <div className="pt-10 w-full container mx-auto px-3">
        <div className='flex flex-col items-center'>
          <p className="text-sm pb-2">{date}</p>
          <h1 className="flex text-3xl font-semibold leading-9">{blog.title}</h1>
          <div className="prose dark:prose-dark mt-6 mb-10 text-gray-600 " dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
      </div>
    )
}