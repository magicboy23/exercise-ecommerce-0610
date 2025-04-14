import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";

export const deleteProductService = async (id: number) => {
  const product = await prisma.product.findFirst({
    where: { id },
  });

  if (!product) {
    throw new ApiError("Invalid product id", 400);
  }

  await prisma.product.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  return { message: "delete product success" };
};
