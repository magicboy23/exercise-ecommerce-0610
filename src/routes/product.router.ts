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

const router = Router();

router.get("/", getProductsController);
router.get("/:slug", getProductBySlugController);
router.post("/", verifyToken, verifyRole(["ADMIN"]), createProductController);
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
