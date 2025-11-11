import { Router } from "express";
import {
  verifyToken,
  authorizeRole,
  validate,
} from "../../../middleware/index.js";
import {
  warehouseSchema,
  warehouseUpdateSchema,
} from "../dto/warehouse.dto.js";
import {
  createwarehouse,
  deletewarehouse,
  getAllwarehouse,
  getwarehouseByid,
  updatewarehouse,
} from "../controllers/warehouse.controllers.js";

const router = Router();

/**
 * 🏗️ Create warehouse
 */
router.post(
  "/createwarehouse",
  verifyToken,
  authorizeRole(["admin", "superadmin", "hr"]),
  validate(warehouseSchema),
  createwarehouse
);

/**
 * 📦 Get all warehouses
 */
router.get(
  "/getAllwarehouse",
  verifyToken,
  authorizeRole(["admin", "superadmin", "hr", "manager"]),
  getAllwarehouse
);

/**
 * 🔍 Get warehouse by ID
 */
router.get(
  "/getwarehouse/:id",
  verifyToken,
  authorizeRole(["admin", "superadmin", "hr", "manager"]),
  getwarehouseByid // ✅ removed unnecessary validation
);

/**
 * ✏️ Update warehouse by ID
 */
router.put(
  "/updatewarehouse/:id",
  verifyToken,
  authorizeRole(["admin", "superadmin", "hr", "manager"]),
  validate(warehouseUpdateSchema),
  updatewarehouse
);

/**
 * 🗑️ Delete warehouse by ID
 */
router.delete(
  "/deletewarehouse/:id",
  verifyToken,
  authorizeRole(["admin", "superadmin", "hr", "manager"]),
  deletewarehouse
);

export default router;
