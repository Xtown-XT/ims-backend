import express from "express";
import warehouseRoutes from "./warehouse.routes.js";

const router = express.Router();

router.use("/warehouse", warehouseRoutes);

export default router;