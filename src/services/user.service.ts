import { Helper } from "../classes/Helper";
import { ProductSchema } from "../models/product.model";
import { UserSchema } from "../models/user.model";

export class UserService {
  static async register(
    params: {
      name: string;
      emailId: string;
      mobileNumber: number;
      country: string;
      storeName: string;
      password: string;
      userRole: string;
    },
    callback: Function
  ) {
    try {
      const result = await UserSchema.find({
        emailId: params.emailId,
        isDelete: false,
      });
      if (result && result.length) {
        callback("exist");
        return;
      } else {
        await UserSchema.create(params);
        callback("true");
      }
    } catch {
      callback("false");
    }
  }
  static async login(
    params: {
      emailId: string;
      password: string;
    },
    callback: Function
  ) {
    try {
      // let Password = Helper.hashPassword(params.password);
      params.password = Helper.hashPassword(params.password);
      let result: any = await UserSchema.findOne(params);
      console.log(result);

      if (!result) {
        callback(false);
        return;
      }

      result = result.toObject();
      result.accessToken = await Helper.generateLoginToken(result);
      callback(result);
    } catch {
      callback(false);
    }
  }

  static async getData(callback: Function) {
    try {
      console.log("hhhhhhhhhhhh");

      const result = await UserSchema.find({});
      callback(result);
    } catch {
      callback(false);
    }
  }

  static async addProduct(
    params: {
      productName: string;
      description: string;
      image: string;
      price: number;
      quantity: number;
    },
    UserId: any,
    callback: Function
  ) {
    try {
      await ProductSchema.create({
        userId: UserId,
        productName: params.productName,
        description: params.description,
        image: params.image,
        price: params.price,
        quantity: params.quantity,
      });
      callback(true);
    } catch {
      callback(false);
    }
  }

  static async updateProduct(
    params: {
      productName: string;
      description: string;
      image: string;
      price: number;
      quantity: number;
    },
    Id: any,
    callback: Function
  ) {
    try {
      await ProductSchema.findByIdAndUpdate(Id, {
        productName: params.productName,
        description: params.description,
        image: params.image,
        price: params.price,
        quantity: params.quantity,
      });
      callback(true);
    } catch {
      callback(false);
    }
  }

  static async deleteProduct(Id: any, callback: Function) {
    try {
      await ProductSchema.findByIdAndUpdate(Id, {
        isDelete: true,
      });
      callback(true);
    } catch {
      callback(false);
    }
  }

  static async getProduct(UserId:any, Id: any, callback: Function) {
    try {
      if (Id && Id.length) {
        const result = await ProductSchema.find({
          userId: UserId,
          _id: Id,
          isDelete: false,
        });
        callback(result);
        return;
      } else {
        const result = await ProductSchema.find({
          userId: UserId,
          isDelete: false,
        });
        callback(result);
      }
      await ProductSchema.findByIdAndUpdate(Id, {
        isDelete: true,
      });
      callback(true);
    } catch {
      callback(false);
    }
  }
}
