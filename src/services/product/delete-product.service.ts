import prisma from "../../config/prisma";
import { ApiError } from "../../utils/api-error";
import { cloudinaryRemove } from "../../lib/cloudinary";
export const deleteProductService = async (id: number, authUserId: number) => {
  const product = await prisma.product.findFirst({
    where: { id },
    include: { store: true },
  });

  if (!product) {
    throw new ApiError("Invalid product id", 400);
  }

  if (product.store.userId !== authUserId) {
    throw new ApiError("Unauthorized", 400);
  }

  await cloudinaryRemove(product.thumbnail);

  await prisma.product.update({
    where: { id },
    data: { deletedAt: new Date(), thumbnail: "" },
  });

  return { message: "delete product success" };
};
