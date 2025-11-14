import { Router } from "express";
import {
  createWarranty,
  getAllWarranties,
  getWarrantyById,
  updateWarranty,
  deleteWarranty,
} from "../controllers/warrenty.controllers.js";

import { warrantySchema, warrantyUpdateSchema } from "../dto/warrenty.dto.js";
import { validate } from "../../../middleware/validate.js";
import { verifyToken } from "../../../middleware/auth.js";
import { authorizeRole } from "../../../middleware/authenticateRole.js";

const router = Router();

// 🟢 Create new warranty
router.post("/createWarranty",verifyToken,authorizeRole(["admin", "superadmin", "user"]), validate(warrantySchema), createWarranty);

// // 🔵 Get all warranties
router.get("/getAllWarranties",verifyToken,authorizeRole(["admin", "superadmin", "user"]),getAllWarranties);

// // 🟣 Get warranty by ID
router.get("/:id",verifyToken,authorizeRole(["admin", "superadmin", "user"]), getWarrantyById);

// // 🟠 Update warranty
router.put("/:id",verifyToken,authorizeRole(["admin", "superadmin", "user"]), validate(warrantyUpdateSchema), updateWarranty);

// // 🔴 Delete warranty
router.delete("/:id",verifyToken,authorizeRole(["admin", "superadmin", "user"]), deleteWarranty);

export default router;
