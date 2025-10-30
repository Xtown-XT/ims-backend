import express from "express";
import CategoriesRoutes  from './categories.routes.js';
import SubcategoriesRoutes  from './subcategory.routes.js';

const router = express.Router();

router.use('/categories', CategoriesRoutes);
router.use('/subcategories', SubcategoriesRoutes); // Example for another entity

export default router;