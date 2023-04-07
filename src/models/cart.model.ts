import mongoose, { Model, model, ObjectId, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export interface CartModel {
  userId?: Schema.Types.ObjectId;
  items?: Schema.Types.ObjectId;
}

const schema = new Schema<CartModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: IDatabaseSchema.USERS,
    },
    items: {
      type: [Schema.Types.ObjectId],
      required: false,
      ref: IDatabaseSchema.PRODUCT,
    },
  },
  {
    timestamps: true,
  }
);

export const CartSchema = model<CartModel>(IDatabaseSchema.CART, schema);
