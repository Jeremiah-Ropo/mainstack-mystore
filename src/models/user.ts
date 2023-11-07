import { IUser, IUserDocument } from "interface/user.interface";
import { Schema, model } from "mongoose";

const UserSchemaField: Record<keyof IUser, any> = {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  last_login: { type: Date },
  store_id: { type: Schema.Types.ObjectId, ref: "store" }, // This should be a reference to the wallet document ID
  verified: { type: Boolean },
  token: { type: String },
};

const UserSchema = new Schema(UserSchemaField, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
});

const UserModel = model<IUserDocument>("user", UserSchema);

export { UserModel };
