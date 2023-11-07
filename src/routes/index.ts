import { Router } from "express"; 

import userRoutes from "./user"; 
import storeRoutes from "./store";
import productRoutes from "./product";

const router = Router();

// * Collective routes: Default (index.ts) route
router.use("/user", userRoutes);
router.use("/store", storeRoutes);
router.use("/product", productRoutes);

export default router;