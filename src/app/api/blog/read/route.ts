import { NextResponse } from "next/server";
import connectDB from "@/utils/connect";
import { BlogModel } from "@/utils/schema";
export async function GET(request: Request) {
    try {
        await connectDB()
        const items = await BlogModel.find()
        return NextResponse.json(items); 
    } catch {
        return NextResponse.json({ message: "アイテム読み込み失敗（シングル）" })
    }
}