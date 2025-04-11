import { Product } from "@prisma/client";
import { ApiError } from "../../utils/api-error";
import prisma from "../../config/prisma";

export const updateProductService = async (
  id: number,
  body: Partial<Product>
) => {
  const product = await prisma.product.findFirst({
    where: { id },
  });

  if (!product) {
    throw new ApiError("Invalid product id", 400);
  }
  if (body.name) {
    const existingProduct = await prisma.product.findFirst({
      where: { name: body.name },
    });
    if (existingProduct) {
      throw new ApiError("Product name already exist", 400);
    }
  }

  return await prisma.product.update({
    where: { id },
    data: body,
  });
};
