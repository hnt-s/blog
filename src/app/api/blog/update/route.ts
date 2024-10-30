import { NextResponse } from "next/server";
import connectDB from "@/utils/connect";
import { BlogModel } from "@/utils/schema";

export async function PATCH(request: Request) {
    const reqBody = await request.json();
    const { _id, ...updateData } = reqBody;  // `id`を取り出し、更新するデータを残す

    await connectDB();
    const updatedItem = await BlogModel.findByIdAndUpdate(_id, updateData, { new: true });

    if (!updatedItem) {
        return NextResponse.json({ message: "アイテムが見つかりません" });
    }

    console.log("アイテム更新成功");
    return NextResponse.json(updatedItem);
}
