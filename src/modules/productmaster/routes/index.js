import express from "express";
import CategoriesRoutes  from './categories.routes.js';

const router = express.Router();

router.use('/categories', CategoriesRoutes);

export default router;