import { User } from "@prisma/client";
import { ApiError } from "../../utils/api-error";
import prisma from "../../config/prisma";
import { hashPassword } from "../../lib/argon";
export const registerService = async (body: User) => {
  // cari tau dulu email nya sudah terpakai atau belom
  // kalo sudah terpakai, throw error
  // kalo belom, buat usernya berdasarkan data yang dikirimkan

  const existingUser = await prisma.user.findFirst({
    where: { email: body.email },
  });

  if (existingUser) {
    throw new ApiError("Email already exist!", 400);
  }

  const hashedPassword = await hashPassword(body.password);

  const newUser = await prisma.user.create({
    data: { ...body, password: hashedPassword },
    omit: { password: true },
  });

  return newUser;
};
