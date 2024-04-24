import { currentUser } from "@clerk/nextjs";
import prisma from "./db";

export const getMe = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("Chưa đăng nhập");
  }

  const externalId = user.id;
  const internalUser = prisma.user.findUnique({
    where: {
      externalId,
    },
  });

  return internalUser;
};
