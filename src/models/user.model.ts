import mongoose, { Model, model, ObjectId, Schema } from "mongoose";
import { Helper } from "../classes/Helper";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";


export enum UserRole {
  OWNER = "OWNER",
  CUSTOMER = "CUSTOMER",
}

export interface UserModel {
  name?: string;
  emailId?: string;
  mobileNumber?:number;
  country?:string;
  storeName?: string;
  password: string;
  userRole?:UserRole;
  isDelete?: boolean;
}

const schema = new Schema<UserModel>(
  {
    name: { type: String, required: true },
    emailId :{ type: String, required: true },
    mobileNumber : { type: Number, required: true },
    country : { type: String, required: false },
    storeName: { type: String, required: false },
    password: { type: String, required: true },
    userRole:{ type:String, required:true, enum :UserRole },
    isDelete: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

schema.pre("save", function (next) {
  this.password = Helper.hashPassword(this.password);
  next();
});


export const UserSchema = model<UserModel>(
  IDatabaseSchema.USERS,
  schema
);
