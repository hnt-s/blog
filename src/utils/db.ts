import { prisma } from '@/app/globals/prisma';

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('データベースに接続されました');
  } catch (error) {
    console.error('データベース接続に失敗しました', error);
  }
};

export const getUserFromDb = async (email: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({
        where: { 
            email,
            password, 
        }});
    console.log(user);
    return user;
  } catch (error) {
    return null;
  }
};
