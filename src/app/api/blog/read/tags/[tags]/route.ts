import { NextResponse } from "next/server";
import connectDB from "@/utils/connect";
import { BlogModel } from "@/utils/schema";

interface Context {
    params: {
        tags: string;
    }
}

export async function GET(request: Request, { params }: Context) {
    //デコード済みタグ
    const { tags } = params;
    try{
        await connectDB()
         // タグを含むブログ投稿を検索
        const items = await BlogModel.find({ tags: { $in: [tags] } });
        return NextResponse.json( items );
    }catch(error){
        console.error("アイテム読み込み失敗:", error);
        return NextResponse.json({ message: "アイテム読み込み失敗" });
    }
}