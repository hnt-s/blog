import { prisma } from '@/app/globals/prisma';

export const connectDB = async () => {
  await prisma.$connect();
  console.log('データベースに接続されました');
};

export const getUserFromDb = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
      where: { 
          email,
          password, 
      }});
  console.log(user);
  return user;
};
