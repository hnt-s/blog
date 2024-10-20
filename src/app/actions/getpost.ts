import fs from "fs";
import path from "path";
import matter from "gray-matter";

//投稿のファイル名を取得
export default async function getPosts() {
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
  
    return posts.sort((a, b) => b.id - a.id);
  }
