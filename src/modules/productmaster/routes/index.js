import express from "express";
import CategoriesRoutes  from './categories.routes.js';
import SubcategoriesRoutes  from './subcategory.routes.js';
import UnitRoutes from './unit.route.js';
import storeRoutes from "./store.routes.js";
import BrandRoutes from './brand.routes.js';

const router = express.Router();

router.use('/categories', CategoriesRoutes);
router.use('/subcategories', SubcategoriesRoutes); 
router.use('/unit', UnitRoutes);
router.use('/store',storeRoutes);
router.use('/brands',BrandRoutes) 

export default router;