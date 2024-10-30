import CredentialsProvider from "next-auth/providers/credentials";
import { getUserFromDb, connectDB } from "@/utils/db";
import { signInSchema } from "@/lib/zod";
import NextAuth from "next-auth";

// authOptionsの型を推論
const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'メールアドレス', type: 'email', placeholder: 'xxxx@gmail.com' },
        password: { label: 'パスワード', type: 'password' }
      },
      async authorize(credentials) {
        const { email, password } = await signInSchema.parseAsync(credentials);
        await connectDB();
        const user = await getUserFromDb(email, password);
        if (!user) {
          throw new Error("ユーザーが存在しません");
        }
        return user;
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
};

const handler = NextAuth(authOptions);

// GET, POSTリクエストのハンドラとしてエクスポート
export const GET = handler;
export const POST = handler;
