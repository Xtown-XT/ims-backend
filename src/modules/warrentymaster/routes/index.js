import express from "express";
import WarrantyRoutes from "./warrenty.routes.js"; // ✅ Add .js at the end

const router = express.Router();

router.use("/warranty", WarrantyRoutes);

export default router;
