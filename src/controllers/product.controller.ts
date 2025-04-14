import { createProductService } from "../services/product/create-product.service";
import { NextFunction, Request, Response } from "express";
import { updateProductService } from "../services/product/update-product.service";
import { getProductsService } from "../services/product/get-product.service";
import { getProductBySlugService } from "../services/product/get-product-by-slug..service";
import { deleteProductService } from "../services/product/delete-product.service";
export const createProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await createProductService(req.body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
export const updateProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await updateProductService(Number(req.params.id), req.body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
export const getProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = {
      page: parseInt(req.query.page as string) || 1,
      take: parseInt(req.query.take as string) || 3,
      sortOrder: (req.query.sortOrder as string) || "desc",
      sortBy: (req.query.sortBy as string) || "created at",
      search: (req.query.search as string) || "",
    };
    const result = await getProductsService(query);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
export const getProductBySlugController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getProductBySlugService(req.params.slug);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
export const deleteProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await deleteProductService(Number(req.params.id));
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
