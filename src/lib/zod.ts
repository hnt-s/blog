import { object, string } from "zod";

//スキーマ整合性チェック
export const signInSchema = object({
    email: string({ required_error: "メールアドレスを入力してください。" })
    .min(1, "メールアドレスを入力してください。")
    .email("無効なメールアドレスです。"),

    password: string({ required_error: "Password is required"})
    .min(1, "パスワードを入力してください")
    .min(8, "パスワードを8文字以上入力してください")
    .max(32, "パスワードを32文字以下で入力してください")
})