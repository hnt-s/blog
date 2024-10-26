import { NextResponse } from "next/server";
import connectDB from "@/utils/connect";
import { BlogModel } from "@/utils/schema";
export async function POST(request: Request) {
    const reqBody = await request.json()
    try{
        await connectDB()
        await BlogModel.create(reqBody)
        return NextResponse.json({message: "アイテム作成成功"})
    }catch{
        return NextResponse.json({message: "アイテム作成失敗"})
    }
}