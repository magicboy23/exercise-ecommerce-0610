import { User } from "@prisma/client";
import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";
import { comparePassword } from "../../lib/argon";
import { JWT_SECRET_KEY } from "../../config/env";
import { sign } from "jsonwebtoken";

export const loginService = async (body: Pick<User, "email" | "password">) => {
  // cek dulu email yang di masukkan ada atau tidak di database
  // kalo tidak ada throw error
  // kalo ada cek passwordnya sesuai atau tidak
  // kalo tidak sesuai, throw error
  // kalau sesuai, kirim data user tsb beserta token jwt

  const { email, password } = body;

  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) {
    throw new ApiError("Invalid credetials", 400);
  }
  const isPasswordValid = await comparePassword(user.password, password);

  if (!isPasswordValid) {
    throw new ApiError("Invalid credentials", 400);
  }

  const tokenPayload = { id: user.id, role: user.role };

  const token = sign(tokenPayload, JWT_SECRET_KEY!, {
    expiresIn: "2h",
  });

  const { password: pw, ...userWithoutPassword } = user;

  return { ...userWithoutPassword, token };
};
