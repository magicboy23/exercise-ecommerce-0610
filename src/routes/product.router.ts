import { Router } from "express";
import {
  createProductController,
  deleteProductController,
  getProductBySlugController,
  getProductsController,
} from "../controllers/product.controller";
import { verifyToken } from "../lib/jwt";
import { verifyRole } from "../middlewares/role.middleware";
import { updateProductController } from "../controllers/product.controller";
import { uploader } from "../lib/multer";
import { fileFilter } from "../lib/fileFilter";

const router = Router();

router.get("/", getProductsController);
router.get("/:slug", getProductBySlugController);
router.post(
  "/",
  verifyToken,
  verifyRole(["ADMIN"]),
  uploader().fields([{ name: "thumbnail", maxCount: 1 }]),
  fileFilter(["image/jpeg", "image/png", "image/avif"]),
  createProductController
);

router.patch(
  "/:id",
  verifyToken,
  verifyRole(["ADMIN"]),
  updateProductController
);
router.delete(
  "/:id",
  verifyToken,
  verifyRole(["ADMIN"]),
  deleteProductController
);

export default router;
