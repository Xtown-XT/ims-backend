import { Router } from "express";
import storeController from "../controller/store.controller.js";
import { verifyToken, authorizeRole } from "../../../middleware/index.js";
import { validate } from "../../../middleware/validate.js";
import {
  createStoreSchema,
  updateStoreSchema,
  storeIdSchema,
} from "../../productmaster/dto/store.zod.js";

const router = Router();

// ✅ Create Store
router.post(
  "/store/create",
  verifyToken,
  authorizeRole(["admin", "superadmin"]),
  validate(createStoreSchema),
  storeController.createStore
);

// ✅ Get All Stores
router.get(
  "/store/all",
  verifyToken,
  authorizeRole(["admin", "superadmin", "user"]),
  storeController.getAllStores
);

// ✅ Get Store by ID
router.get(
  "/store/:id",
  verifyToken,
  authorizeRole(["admin", "superadmin", "user"]),
  validate(storeIdSchema, "params"),
  storeController.getStoreById
);

// ✅ Update Store
router.put(
  "/store/:id",
  verifyToken,
  authorizeRole(["admin", "superadmin"]),
  validate(updateStoreSchema),
  storeController.updateStore
);

// ✅ Delete Store
router.delete(
  "/store/:id",
  verifyToken,
  authorizeRole(["admin", "superadmin"]),
  validate(storeIdSchema, "params"),
  storeController.deleteStore
);

export default router;
