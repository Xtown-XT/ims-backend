import express from "express";
import CategoriesRoutes  from './categories.routes.js';
import SubcategoriesRoutes  from './subcategory.routes.js';
import UnitRoutes from './unit.route.js';

const router = express.Router();

router.use('/categories', CategoriesRoutes);
router.use('/subcategories', SubcategoriesRoutes); 
router.use('/unit', UnitRoutes);

export default router;