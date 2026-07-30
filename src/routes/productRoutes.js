import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { validateCreateProduct, validateUpdateProduct } from "../validators/productValidator.js";

const router = Router();

/**
 * Base: /api/productos
 */

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", validateCreateProduct, createProduct);
router.put("/:id", validateUpdateProduct, updateProduct);
router.delete("/:id", deleteProduct);

export default router;
