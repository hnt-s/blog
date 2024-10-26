import CredentialsProvider from "next-auth/providers/credentials";
import { getUserFromDb, connectDB } from "@/utils/db";
import { signInSchema } from "@/lib/zod"
import NextAuth from "next-auth"

const authOptions = {
    //providers
    providers: [
        //ユーザ用認証
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'メールアドレス', type: 'email', placeholder:'xxxx@gmail.com'},
                password: { label: 'パスワード', type: 'password' }
            },
            //認証プログラムを用意
            async authorize(credentials) {
                const { email, password } = await signInSchema.parseAsync(credentials);

                await connectDB();

                // データベースからユーザを取得
                const user = await getUserFromDb(email, password);

                // ユーザーが存在しない場合
                if (!user) {
                    throw new Error("ユーザーが存在しません");
                }

                return user;
            }
        })
    ],

}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST }