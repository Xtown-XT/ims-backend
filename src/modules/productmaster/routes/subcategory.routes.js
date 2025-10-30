// import { Router } from "express";
// import subcategoryController from "../controller/subcategory.controller.js";
// import { verifyToken, authorizeRole } from "../../../middleware/index.js";
// import { validate } from "../../../middleware/validate.js";
// import { upload } from "../../../middleware/upload.js";


// import {
//     createSubcategorySchema,
//     updateSubcategorySchema,
//     subcategoryIdSchema,
// } from "../dto/subcategory.zod.js";

// const router = Router();

// // // Public / Authenticated routes
// // router.post(
// //     "/subcategories/create",
// //     verifyToken,
// //     authorizeRole(["admin", "superadmin", "user"]),
// //     validate(createSubcategorySchema),
// //     subcategoryController.createSubcategory
// // );


// // IMPORTANT: uploadSingle comes FIRST so req.body and req.file are populated
// router.post(
//   "/subcategories/create",verifyToken,
//    authorizeRole(["admin", "superadmin", "user"]),
//   upload("image", "subcategories"),        // <-- multer parses multipart/form-data
//   validate(createSubcategorySchema),            // <-- now req.body has values
//   subcategoryController.createSubcategory
// );
// router.get(
//     "/subcategories/all",
//     verifyToken,
//     authorizeRole(["admin", "superadmin", "user"]),
//     subcategoryController.getAllSubcategories
// );

// router.get(
//     "/subcategories/:id",
//     verifyToken,
//     authorizeRole(["admin", "superadmin", "user"]),
//     validate(subcategoryIdSchema),
//     subcategoryController.getSubcategoryById
// );

// router.put(
//     "/subcategories/:id",
//     verifyToken,
//     authorizeRole(["admin", "superadmin", "user"]),
//     validate(subcategoryIdSchema),
//     validate(updateSubcategorySchema),
//     subcategoryController.updateSubcategory
// );

// router.delete(
//     "/subcategories/:id",
//     verifyToken,
//     authorizeRole(["admin", "superadmin", "user"]),
//     validate(subcategoryIdSchema),
//     subcategoryController.deleteSubcategory
// );

// export default router;

// routes/subcategory.routes.js
import { Router } from "express";
import subcategoryController from "../controller/subcategory.controller.js";
import { verifyToken, authorizeRole } from "../../../middleware/index.js";
import { validate } from "../../../middleware/validate.js";
import uploadSingle from "../../../middleware/upload.js"; // default export is uploadSingle

import {
  createSubcategorySchema,
  updateSubcategorySchema,
  subcategoryIdSchema,
} from "../dto/subcategory.zod.js";

const router = Router();

// NOTE: order matters: verifyToken -> authorizeRole -> uploadSingle -> validate -> controller
router.post(
  "/subcategories/create",
  verifyToken,
  authorizeRole(["admin", "superadmin", "user"]),
  uploadSingle("image", "subcategories"), // multer runs here and populates req.file and req.body
  validate(createSubcategorySchema),
  subcategoryController.createSubcategory
);

router.get(
  "/subcategories/all",
  verifyToken,
  authorizeRole(["admin", "superadmin", "user"]),
  subcategoryController.getAllSubcategories
);

router.get(
  "/subcategories/:id",
  verifyToken,
  authorizeRole(["admin", "superadmin", "user"]),
  validate(subcategoryIdSchema),
  subcategoryController.getSubcategoryById
);

router.put(
  "/subcategories/:id",
  verifyToken,
  authorizeRole(["admin", "superadmin", "user"]),
  validate(subcategoryIdSchema),
  validate(updateSubcategorySchema),
  subcategoryController.updateSubcategory
);

router.delete(
  "/subcategories/:id",
  verifyToken,
  authorizeRole(["admin", "superadmin", "user"]),
  validate(subcategoryIdSchema),
  subcategoryController.deleteSubcategory
);

export default router;
