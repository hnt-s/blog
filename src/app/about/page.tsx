
import Link from "next/link";
export default function About(){
    return (
        <main>
            <div className="flex justify-center border-b border-gray-200 items-center p-3">
                <h1 className="text-3xl font-semibold leading-9 text-center">About</h1>
            </div>
            <div className="flex-col flex justify-center items-center p-5">
                <img src="/static/logo.png" alt="logo" className="w-40 h-40 rounded" />
                <p className="text-3xl dark:text-white font-semibold leading-9 pt-2">Blog Tree</p>
            </div>
            <div className="flex justify-center mb-5">
                <Link href="https://github.com/hnt-s" target="_blank">
                    <img src="/static/github_icon.png" alt="github" className="w-7 h-7 rounded dark:invert" />
                </Link>
            </div>
            <div className="text-center pb-10">
                <h1 className="text-lg font-semibold leading-9">本サイトについて</h1>
                <p>Blog Treeは、読んだ本や学んだ技術をまとめた記録ブログです。</p>
                <p>このサイトは、Next.js と TypeScript で構築されています。</p><br/>
                <p>現在私は大学生で、情報系の分野を専攻しています。<br/>新しいことに挑戦することが好きで、自分のモチベーション維持に役立てるためにブログを作成しました。</p>
            </div>
      </main>
    )
}