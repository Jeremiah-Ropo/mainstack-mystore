import { Request, Response, NextFunction } from "express";
import { Service } from "typedi";
import { IProductInputDTO } from "interface/product.interface";
import ProductService from "../services/product.services";

@Service()
class ProductController {
  constructor(private readonly productService: ProductService) {}

  createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product: IProductInputDTO = req.body;
      const userId = req.jwtPayload.user_id;
      const storeId = req.params.store_id;
      const newProduct = await this.productService.createProduct(userId, storeId, product, next);
      if (newProduct != null) {
        res.customSuccess(201, "Product created successfully", newProduct);
      }
    } catch (error) {
      next(error);
    }
  };

  getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.jwtPayload.user_id;
      const productId = req.params.product_id;
      const product = await this.productService.getProductById(userId, productId, next);
      if (product != null) {
        res.customSuccess(200, "Product retrieved successfully", product);
      }
    } catch (error) {
      next(error);
    }
  };

  getAllStoreProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.jwtPayload.user_id;
      const storeId = req.params.store_id;
      const products = await this.productService.getAllStoreProducts(userId, storeId, next);
      if (products != null) {
        res.customSuccess(200, "Products retrieved successfully", products);
      }
    } catch (error) {
      next(error);
    }
  };

  getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.productService.getAllProducts(next);
      if (products != null) {
        res.customSuccess(200, "Products retrieved successfully", products);
      }
    } catch (error) {
      next(error);
    }
  };

  updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product: IProductInputDTO = req.body;
      const userId = req.jwtPayload.user_id;
      const productId = req.params.product_id;
      const updateProduct = await this.productService.updateProduct(userId, productId, product, next);
      if (updateProduct != null) {
        res.customSuccess(200, "Product updated successfully", updateProduct);
      }
    } catch (error) {
      next(error);
    }
  };

  deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.jwtPayload.user_id;
      const productId = req.params.product_id;
      const deleteProduct = await this.productService.deleteProduct(userId, productId, next);
      if (deleteProduct != null) {
        res.customSuccess(200, "Product deleted successfully", deleteProduct);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default ProductController;
