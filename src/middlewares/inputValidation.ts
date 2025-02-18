import { Request, Response, NextFunction } from "express";
import joi from "joi";

import { CustomError } from "../utils/response/custom-error/customError";

export const userSchema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required()
})

export const loginSchema = joi.object({
    password: joi.string().required(),
    email: joi.string().email().required()
})
export const productSchema = joi.object({
    name: joi.string().required(),
    description: joi.string(),
    sku: joi.string().required(),
    price: joi.number().required(),
    image: joi.string(),
    quantity: joi.number().required()
})

export const storeSchema = joi.object({
    name: joi.string().required(),
    description: joi.string(),
    address: joi.object({
        street: joi.string().required(),
        city: joi.string().required(),
        state: joi.string().required(),
        country: joi.string().required()
    })
})

export const userValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userSchema.validateAsync(req.body);
        next();
    } catch (error) {
        return next(new CustomError(400, "Validation", error.message))
    }
}

export const loginValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await loginSchema.validateAsync(req.body);
        next();
    } catch (error) {
        return next(new CustomError(400, "Validation", error.message))
    }
}

export const productValidation = async (req, res, next) => {
    try {
        await productSchema.validateAsync(req.body);
        next();
    } catch (error) {
        return next(new CustomError(400, "Validation", error.message))
    }
}

export const storeValidation = async (req, res, next) => {
    try {
        await storeSchema.validateAsync(req.body);
        next();
    } catch (error) {
        return next(new CustomError(400, "Validation", error.message))
    }
}
