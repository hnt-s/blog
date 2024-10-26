import { NextResponse } from "next/server";
import connectDB from "@/utils/connect";
import { BlogModel } from "@/utils/schema";
interface Context {
    params: {
        id: string;
    };
}
export async function GET(request: Request, { params }: Context) {
    const { id } = params
    try {
        await connectDB()
        const singleItem = await BlogModel.findById(id)
        return NextResponse.json(singleItem)
    } catch {
        return NextResponse.json({ message: "アイテム読み込み失敗（シングル）" })
    }
}