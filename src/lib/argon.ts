import { hash, verify } from "argon2";

export const hashPassword = async (password: string) => {
  return await hash(password);
};

export const comparePassword = async (
  hashedPassword: string,
  candidatePassword: string
) => {
  return await verify(hashedPassword, candidatePassword);
};
