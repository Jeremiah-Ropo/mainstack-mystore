import { Schema, model } from "mongoose";

import { IProduct, IProductDocument } from "../interface/product.interface";

const ProductSchemaField: Record<keyof IProduct, any> = {
    name: { type: String, required: true },
    sku: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  quantity: { type: Number, required: true },
  store_id: { type: Schema.Types.ObjectId, ref: "store", required: true },
};

const ProductSchema = new Schema(ProductSchemaField, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
});

const ProductModel = model<IProductDocument>("product", ProductSchema);

export { ProductModel };
