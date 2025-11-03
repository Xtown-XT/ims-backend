// src/modules/employee/routes/employee.routes.js
import { Router } from "express";
import employeeController from "../controller/employee.controllers.js";
import { verifyToken, authorizeRole } from "../../../middleware/index.js";
import { validate } from "../../../middleware/validate.js";
import { upload } from "../../../middleware/upload.js";
import {
  createEmployeeSchema,
  updateEmployeeSchema,
  idSchema,
} from "../dto/employee.zod.js";

const router = Router();

// CREATE
router.post(
  "/createEmployee",
  verifyToken,
  authorizeRole(["admin", "superadmin", "hr"]),
  upload.single("profile_picture"),
  validate(createEmployeeSchema),
  employeeController.createEmployee
);

// GET ALL
router.get(
  "/getAllEmployees",
  verifyToken,
  authorizeRole(["admin", "superadmin", "hr", "manager"]),
  employeeController.getAllEmployees
);

// GET BY ID
router.get(
  "/getEmployeeById/:id",
  verifyToken,
  authorizeRole(["admin", "superadmin", "hr", "manager"]),
  validate(idSchema, "params"),
  employeeController.getEmployeeById
);

// UPDATE
router.put(
  "/updateEmployee/:id",
  verifyToken,
  authorizeRole(["admin", "superadmin", "hr"]),
  upload.single("profile_picture"),
  validate(updateEmployeeSchema),
  employeeController.updateEmployee
);

// DELETE
router.delete(
  "/deleteEmployee/:id",
  verifyToken,
  authorizeRole(["admin", "superadmin"]),
  validate(idSchema, "params"),
  employeeController.deleteEmployee
);

export default router;
