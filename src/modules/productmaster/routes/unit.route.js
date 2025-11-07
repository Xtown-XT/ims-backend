import { Router } from "express";
import unitController from "../controller/unit.controller.js";
import { verifyToken, authorizeRole } from "../../../middleware/index.js";
import { validate } from "../../../middleware/validate.js";

import {
  createUnitSchema,
  updateUnitSchema,
  unitIdSchema,
} from "../dto/unit.zod.js";

const router = Router();

// ✅ Create
router.post(
  "/create",
  verifyToken,
  authorizeRole(["admin", "superadmin", "user"]),
  validate(createUnitSchema),
  unitController.createUnit
);

// ✅ Get All
router.get(
  "/all",
  verifyToken,
  authorizeRole(["admin", "superadmin", "user"]),
  unitController.getAllUnits
);

// ✅ Get by ID
router.get(
  "/:id",
  verifyToken,
  authorizeRole(["admin", "superadmin", "user"]),
  validate(unitIdSchema, "params"),
  unitController.getUnitById
);

// ✅ Update
router.put(
  "/:id",
  verifyToken,
  authorizeRole(["admin", "superadmin"]),
  validate(updateUnitSchema),
  unitController.updateUnit
);

// ✅ Delete
router.delete(
  "/:id",
  verifyToken,
  authorizeRole(["admin", "superadmin"]),
  validate(unitIdSchema, "params"),
  unitController.deleteUnit
);

export default router;
