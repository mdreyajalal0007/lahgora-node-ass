import mongoose, { Model, model, ObjectId, Schema } from "mongoose";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";

export interface ProductModel {
  userId?: Schema.Types.ObjectId;
  productName?: string;
  image?: string;
  description?: string;
  price?: number;
  quantity: number;
  isDelete?: boolean;
}

const schema = new Schema<ProductModel>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref:IDatabaseSchema.USERS },
    productName: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    isDelete: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

export const ProductSchema = model<ProductModel>(IDatabaseSchema.PRODUCT, schema);
