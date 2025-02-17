import { add } from "date-fns";
import joi from "joi";

export const userSchema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required,
    email: joi.string().email().required(),
    password: joi.string().required()
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

export const userValidation = async (req, res, next) => {
    try {
        const value = await userSchema.validateAsync(req.body);
        next();
    } catch (error) {
        return next(error)
    }
}

export const productValidation = async (req, res, next) => {
    try {
        const value = await productSchema.validateAsync(req.body);
        next();
    } catch (error) {
        return next(error)
    }
}

export const storeValidation = async (req, res, next) => {
    try {
        const value = await storeSchema.validateAsync(req.body);
        next();
    } catch (error) {
        return next(error)
    }
}
