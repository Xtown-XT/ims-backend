// src/modules/taxmaster/routes/tax.routes.js

import express from "express";
import {
  createtax,
  getalltax,
  getById,
  update,
  softDelete,
  restore,
} from "../controllers/tax.controllers.js";

import { createTaxSchema, updateTaxSchema } from "../dto/tax.zod.js";
import { authorizeRole, validate, verifyToken } from "../../../middleware/index.js";

const router = express.Router();

// -------------------------
// 📌 Create Tax
// -------------------------
router.post(
  "/createtax",
  verifyToken,
  authorizeRole(["admin", "superadmin", "user"]),
  validate(createTaxSchema),
  createtax
);

// -------------------------
// 📌 Get All Taxes
// -------------------------
router.get(
  "/getalltax",
  verifyToken,
  authorizeRole(["admin", "superadmin", "user"]),
  getalltax
);

// -------------------------
// 📌 Get Single Tax by ID
// -------------------------
router.get(
  "/getbyid/:id",
  verifyToken,
  authorizeRole(["admin", "superadmin", "user"]),
  getById
);

// -------------------------
// 📌 Update Tax
// -------------------------
router.put(
  "/update/:id",
  verifyToken,
  authorizeRole(["admin", "superadmin", "user"]),
  validate(updateTaxSchema),
  update
);

// -------------------------
// 📌 Soft Delete Tax
// -------------------------
router.patch(
  "/softdelete/:id",
  verifyToken,
  authorizeRole(["admin", "superadmin"]),
  softDelete
);

// -------------------------
// 📌 Restore Soft Deleted Tax
// -------------------------
router.patch(
  "/restore/:id",
  verifyToken,
  authorizeRole(["admin", "superadmin"]),
  restore
);

export default router;
