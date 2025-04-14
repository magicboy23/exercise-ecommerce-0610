import { ApiError } from "../../utils/api-error";
import prisma from "../../config/prisma";
export const getProductBySlugService = async (slug: string) => {
  const product = await prisma.product.findFirst({
    where: { slug, deletedAt: null },
  });

  if (!product) {
    throw new ApiError("Product not found", 400);
  }

  return product;
};
