import { Router } from "express";
import { createProductController } from "../controllers/product.controller";
import { verifyToken } from "../lib/jwt";
import { verifyRole } from "../middlewares/role.middleware";
const router = Router();

router.post("/", verifyToken, verifyRole(["ADMIN"]), createProductController);

export default router;
