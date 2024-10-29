import { NextResponse } from "next/server";
import connectDB from "@/utils/connect";
import { BlogModel } from "@/utils/schema";

export async function DELETE(request: Request) {
    const { _id } = await request.json();

    try {
        await connectDB();

        const deletedItem = await BlogModel.findByIdAndDelete(_id);

        if (!deletedItem) {
            return NextResponse.json({ message: "アイテムが見つかりません" });
        }

        return NextResponse.json({ message: "アイテム削除成功", deletedItem });
    } catch (error) {
        console.error("アイテム削除失敗:", error);
        return NextResponse.json({ message: "アイテム削除失敗" });
    }
}
