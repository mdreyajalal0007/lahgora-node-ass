import { Helper } from "../classes/Helper";
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
}
