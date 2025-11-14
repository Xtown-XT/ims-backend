import {Router} from "express";
import { verifyToken } from "../../../middleware/auth.js";
import { authorizeRole } from "../../../middleware/authenticateRole.js";
import { createVariant, deleteVariant, getAllvariants, getvariantById, updatevariant } from "../controllers/varrient.controllers.js";
import { validate } from "../../../middleware/validate.js";
import { variantIdSchema, variantSchema, variantUpdateSchema, } from "../zod/varrient.dto.js";





const router = Router();

router.post("/createVariant",verifyToken,authorizeRole(["admin", "superadmin", "user"]),validate( variantSchema ), createVariant);
router.get("/getAllvariants",verifyToken,authorizeRole(["admin", "superadmin", "user"]), getAllvariants);
router.put("/updatevariant/:id",verifyToken,authorizeRole(["admin", "superadmin", "user"]),   updatevariant);validate(variantUpdateSchema)
router.delete("/deleteVariant:id",verifyToken,authorizeRole(["admin", "superadmin", "user"]), deleteVariant);
router.get ("/getvariant/:id",verifyToken,authorizeRole(["admin", "superadmin", "user"]),validate(variantIdSchema), getvariantById);



export default router