import { Router } from "express";
import { Container } from "typedi";
import { checkUserJwt } from "../middlewares/checkUserJwt";
import StoreController from "../controllers/store.controllers";

const storeController = Container.get(StoreController);

const router = Router();

router.post("/create", checkUserJwt, storeController.createStore);

router.get("/:store_id", checkUserJwt, storeController.getStoreById);

router.get("/all", storeController.getAllStores);

router.patch("/update", checkUserJwt, storeController.updateStore);

router.get("/", checkUserJwt, storeController.getUserStoreById);

router.get("/user/product", checkUserJwt, storeController.getUserProduct);

export default router;
