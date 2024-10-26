import { NextResponse } from "next/server";
import connectDB from "@/utils/connect";
import { BlogModel } from "@/utils/schema";

export async function PATCH(request: Request) {
    const reqBody = await request.json();
    const { id, ...updateData } = reqBody;  // `id`を取り出し、更新するデータを残す

    try {
        await connectDB();
        
        const updatedItem = await BlogModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedItem) {
            return NextResponse.json({ message: "アイテムが見つかりません" });
        }

        return NextResponse.json({ message: "アイテム更新成功", updatedItem });
    } catch (error) {
        console.error("アイテム更新失敗:", error);
        return NextResponse.json({ message: "アイテム更新失敗" });
    }
}
