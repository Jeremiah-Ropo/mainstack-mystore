import { Request, Response, NextFunction } from "express"
import { Service } from "typedi";
import { StoreModel, UserModel, ProductModel } from "../models";
import { IStore, IStoreInputDTO } from "../interface/store.interface";
import { IProduct } from "../interface/product.interface";
import { CustomError } from "../utils/response/custom-error/customError";


@Service()
class StoreService {
    constructor(private readonly store = StoreModel, private readonly user = UserModel, private readonly product = ProductModel) { }

    async createStore(userId: string, storeInputDTO: IStoreInputDTO, next: NextFunction): Promise<IStore | void> { 
        try {
            const user = await this.user.findById(userId);
            if (!user) next(new CustomError(404, "User does not exist"));

            const { name } = storeInputDTO;
            const store = await this.store.findOne({ name });
            if (store) throw next(new CustomError(400, "Store already exists"));

            const newStore = await this.store.create({ ...storeInputDTO, user_id: user });
            return newStore;
        } catch (error) {
            return next(new CustomError(500, "Internal server error", error.message));
        }
    }

    async getUserStoreById(userId: string, next: NextFunction): Promise<IStore[] | void> {
        try {
            const user = await this.user.findById(userId);
            if (!user) throw next(new CustomError(404, "User does not exist"));

            const store = await this.store.find({user_id: userId});
            return store;
        } catch (error) {
            return next(new CustomError(500, "Internal server error", error.message));
        }
    }

    async updateStore(userId: string, storeInputDTO: any, next: NextFunction): Promise<IStore | void> {
        try {
            const user = await this.user.findById(userId);
            if (!user) return next(new CustomError(404, "User does not exist"));

            const store = await this.store.findOne({ user_id: userId });
            if (!store) throw next(new CustomError(404, "Store does not exist"));

            const storeUpdate = await this.store.findByIdAndUpdate(store._id, storeInputDTO, { new: true });
            return storeUpdate;
        } catch (error) {
            return next(new CustomError(500, "Internal server error", error.message));
        }
    };

    async getAllStores(userId: string, next: NextFunction): Promise<IStore[] | void> {
        try {
            const user = await this.user.findById(userId);
            if (!user) throw next(new CustomError(404, "User does not exist"));

            const stores = await this.store.find();
            return stores;
        } catch (error) {
            return next(new CustomError(500, "Internal server error", error.message));
        }
    }


    async getUserProduct(userId: string, next: NextFunction): Promise<IProduct[] | void> { 
        try {
            const user = await this.user.findById(userId);
            if (!user) return next(new CustomError(404, "User does not exist"));
    
            const store = await this.store.findOne({ user_id: userId });
            if (!store) return next(new CustomError(404, "Store does not exist"));
    
            const product = await this.product.find({store_id: store.id});
            return product;
        } catch (error) { 
            return next(new CustomError(500, "Internal server error", error.message));
        }
    }

    async getStoreById(userId: string, storeId: string, next: NextFunction): Promise<IStore | void> {
        try {
            const user = await this.user.findById(userId);
            if (!user) return next(new CustomError(404, "User does not exist"));

            const store = await this.store.findById(storeId);
            if (!store) throw next(new CustomError(404, "Store does not exist"));
            return store;

        } catch (error) {
            return next(new CustomError(500, "Internal server error", error.message));
        }
    }
}

export default StoreService;