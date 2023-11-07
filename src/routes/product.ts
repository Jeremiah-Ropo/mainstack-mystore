import { Router } from "express";

import { Container } from "typedi";
import { checkUserJwt } from "../middlewares/checkUserJwt";
import ProductController from "../controllers/product.controllers";

const productController = Container.get(ProductController);

const router = Router();

router.post("/create/:store_id", checkUserJwt, productController.createProduct);

router.get('/', productController.getAllProducts);

router.get('/:product_id', checkUserJwt, productController.getProductById);

router.patch('/update/:product_id', checkUserJwt, productController.updateProduct);

router.delete('/delete/:product_id', checkUserJwt, productController.deleteProduct);

router.get('/store/:store_id', checkUserJwt, productController.getAllStoreProducts);

export default router;