import { Router } from "express";
import categoryController from "../controller/categories.controller.js";
import { verifyToken, authorizeRole } from "../../../middleware/index.js";
import { validate } from "../../../middleware/validate.js";

import {
  createCategorySchema,
  updateCategorySchema,
  categoryIdSchema,
} from "../dto/categories.zod.js";


const router = Router();

// Public / Authenticated routes
router.post(
  "/categories/create",
  verifyToken,
  authorizeRole(["admin", "superadmin", "user"]),
  validate(createCategorySchema),
  categoryController.createCategory
);

router.get(
  "/categories/all",
  verifyToken,
  authorizeRole(["admin", "superadmin", "user"]),
  categoryController.getAllCategories
);

// Protected routes (by ID)
router.get(
  "/categories/:id",
  verifyToken,
  authorizeRole(["admin", "superadmin", "user"]),
  validate(categoryIdSchema, "params"),
  categoryController.getCategoryById
);

router.put(
  "/categories/:id",
  verifyToken,
  authorizeRole(["admin", "superadmin"]), 
  validate(updateCategorySchema),
  categoryController.updateCategory
);

router.delete(
  "/categories/:id",
  verifyToken,
  authorizeRole(["admin", "superadmin"]), 
  validate(categoryIdSchema, "params"),
  categoryController.deleteCategory
);

export default router;
