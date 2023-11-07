import { Request, Response, NextFunction } from "express";

import { Service } from "typedi";

import StoreService from "../services/store.services";

import { IStoreInputDTO } from "../interface/store.interface";

@Service()
class StoreController {
  constructor(private readonly storeService: StoreService) {}

  createStore = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const store: IStoreInputDTO = req.body;
      const userId = req.jwtPayload.user_id;
      const newStore = await this.storeService.createStore(userId, store, next);
      if (newStore != null) {
        res.customSuccess(201, "Store created successfully", newStore);
      }
    } catch (error) {
      next(error);
    }
  };

  getUserStoreById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.jwtPayload.user_id;
      const store = await this.storeService.getUserStoreById(userId, next);
      if (store != null) {
        res.customSuccess(200, "User's store retrieved successfully", store);
      }
    } catch (error) {
      next(error);
    }
  };

  getStoreById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.jwtPayload.user_id;
      const storeId = req.params.store_id;
      const store = await this.storeService.getStoreById(userId, storeId, next);
      if (store != null) {
        res.customSuccess(200, "Store retrieved successfully", store);
      }
    } catch (error) {
      next(error);
    }
  };

  updateStore = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const store: IStoreInputDTO = req.body;
      const userId = req.jwtPayload.user_id;
      const updateStore = await this.storeService.updateStore(userId, store, next);
      if (updateStore != null) {
        res.customSuccess(200, "Store updated successfully", updateStore);
      }
    } catch (error) {
      next(error);
    }
  };

  getAllStores = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.jwtPayload.user_id;
      const stores = await this.storeService.getAllStores(userId, next);
      if (stores != null) {
        res.customSuccess(200, "Stores retrieved successfully", stores);
      }
    } catch (error) {
      next(error);
    }
  };

  getUserProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.jwtPayload.user_id;
      const products = await this.storeService.getUserProduct(userId, next);
      if (products != null) {
        res.customSuccess(200, "Products retrieved successfully", products);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default StoreController;
