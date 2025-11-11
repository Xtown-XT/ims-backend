import { Router } from "express";
import brandController from "../controller/brand.controller.js";
import { verifyToken, authorizeRole } from "../../../middleware/index.js";
import { validate } from "../../../middleware/validate.js";
import uploadSingle from "../../../middleware/upload.js";

import { createBrandSchema, updateBrandSchema, brandIdSchema } from "../dto/brand.zod.js";

const router = Router();

// Create Brand (authenticated + file upload)
router.post(
  "/brands/create",
  verifyToken,
  authorizeRole(["admin", "superadmin", "user"]),
  uploadSingle("image", "brands"),
  validate(createBrandSchema),
  brandController.createBrand
);

// Get all brands (with pagination / search)
router.get(
  "/brands/all",
  verifyToken,
  authorizeRole(["admin", "superadmin", "user"]),
  brandController.getAllBrands
);

// Get one brand by id
router.get(
  "/brands/:id",
  verifyToken,
  authorizeRole(["admin", "superadmin", "user"]),
  validate(brandIdSchema),
  brandController.getBrandById
);

// Update brand (allow upload)
router.put(
  "/brands/:id",
  verifyToken,
  authorizeRole(["admin", "superadmin", "user"]),
  uploadSingle("image", "brands"), // handle optional file
  validate(brandIdSchema),
  validate(updateBrandSchema),
  brandController.updateBrand
);

// Delete brand
router.delete(
  "/brands/:id",
  verifyToken,
  authorizeRole(["admin", "superadmin", "user"]),
  validate(brandIdSchema),
  brandController.deleteBrand
);

export default router;

