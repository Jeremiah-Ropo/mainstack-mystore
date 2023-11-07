import { Request, Response, NextFunction } from "express";

import { Service } from "typedi";
import { StoreModel, UserModel, ProductModel } from "../models";

import { IProduct, IProductInputDTO } from "../interface/product.interface";
import { CustomError } from "../utils/response/custom-error/customError";
import { uniqueGeneratorSku } from "../utils/uniqueGenerator";

@Service()
class ProductService {
  constructor(private readonly product = ProductModel, private readonly store = StoreModel, private readonly user = UserModel) {}

  async createProduct(
    userId: string,
    storeId: string,
    productInputDTO: IProductInputDTO,
    next: NextFunction,
  ): Promise<IProduct | void> {
    try {
      const user = await this.user.findById(userId);
      if (!user) next(new CustomError(404, "User does not exist"));

      const store = await this.store.findById(storeId);
      if (!store) next(new CustomError(404, "Store does not exist"));

      let { sku: productSku } = productInputDTO;
      const product = await this.product.findOne({ sku: productSku });
      if (product) next(new CustomError(400, "Product already exists"));
      const sku = uniqueGeneratorSku();
      const newProduct = await this.product.create({ ...productInputDTO, sku, store_id: store });
      return newProduct;
    } catch (error) {
      next(new CustomError(500, "Internal server error", error.message));
    }
  }

  async getAllProducts(next: NextFunction): Promise<IProduct[] | void> {
    try {
      const products = await this.product.find();
      return products;
    } catch (error) {
      next(new CustomError(500, "Internal server error", error.message));
    }
  }

  async getProductById(userId: string, productId: string, next: NextFunction): Promise<IProduct | void> {
    try {
      const user = await this.user.findById(userId);
      if (!user) next(new CustomError(404, "User does not exist"));

      const product = await this.product.findById(productId);
      if (!product) next(new CustomError(404, "Product does not exist"));

      return product;
    } catch (error) {
      next(new CustomError(500, "Internal server error", error.message));
    }
  }

  async getAllStoreProducts(userId: string, storeId: string, next: NextFunction): Promise<IProduct[] | void> {
    try {
      const user = await this.user.findById(userId);
      if (!user) throw next(new CustomError(404, "User does not exist"));

      const store = await this.store.findById(storeId);
      if (!store) next(new CustomError(404, "Store does not exist"));

      const products = await this.product.find({ store_id: store._id });
      return products;
    } catch (error) {
      next(new CustomError(500, "Internal server error", error.message));
    }
  }

  async updateProduct(
    userId: string,
    productId: string,
    productInputDTO: IProductInputDTO,
    next: NextFunction,
  ): Promise<IProduct | void> {
    try {
      const user = await this.user.findById(userId);
      if (!user) next(new CustomError(404, "User does not exist"));
      const product = await this.product.findById(productId);
      if (!product) next(new CustomError(404, "Product does not exist"));

      const updatedProduct = await this.product.findByIdAndUpdate(productId, productInputDTO, { new: true });
      return updatedProduct;
    } catch (error) {
      next(new CustomError(500, "Internal server error", error.message));
    }
  }

  async deleteProduct(userId: string, productId: string, next: NextFunction): Promise<IProduct | void> {
    try {
      const user = await this.user.findById(userId);
      if (!user) next(new CustomError(404, "User does not exist"));

      const product = await this.product.findById(productId);
      if (!product) next(new CustomError(404, "Product does not exist"));

      const deletedProduct = await this.product.findByIdAndDelete(productId);
      return deletedProduct;
    } catch (error) {
      next(new CustomError(500, "Internal server error", error.message));
    }
  }
}

export default ProductService;
