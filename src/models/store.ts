import { Schema, model } from "mongoose";
import { IStore, IStoreDocument } from "../interface/store.interface";

const StoreSchemaField: Record<keyof IStore, any> = {
  name: { type: String, required: true },
  user_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
  description: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
  },
};

const StoreSchema = new Schema(StoreSchemaField, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
});

const StoreModel = model<IStoreDocument>("store", StoreSchema);

export { StoreModel };
