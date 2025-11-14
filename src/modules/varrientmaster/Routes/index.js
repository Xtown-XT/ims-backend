import express from "express";
import varrientRoutes from "./varrient.routes.js";

const router = express.Router();

router.use("/varrient", varrientRoutes);

export default router;