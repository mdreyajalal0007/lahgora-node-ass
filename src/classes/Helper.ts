import { NextFunction } from "express";
import { Environment } from "../constants/Environment";
import { UserRole, UserModel, UserSchema } from "../models/user.model";
import { HttpResponse } from "./HttpResponse";

const { scryptSync } = require("crypto");
const jwt = require("jsonwebtoken");

export class Helper {
  constructor() {}

  static hashPassword(password: string) {
    return scryptSync(password, Environment.PASSWORD_SALT_SECRET, 32).toString(
      "hex"
    );
  }

  static compareHashedPassword(password: string, hash: string) {
    if (this.hashPassword(password) === hash) {
      return true;
    } else {
      return false;
    }
  }

  static async generateLoginToken(loginData: object) {
    let token = await jwt.sign(
      {
        ...loginData,
      },
      Environment.JWT_SECRET_TOKEN,
      { expiresIn: "6h" }
    );

    token = `Bearer ${token}`;
    return token;
  }

  static async validateLoginToken(token: string) {
    try {
      const decoded = await jwt.verify(token, Environment.JWT_SECRET_TOKEN);
      return decoded;
    } catch (error) {
      return null;
    }
  }

  // static protectedRoute(roles: UserRole[]) {
  //   return async (req: Request, res: Response, next: NextFunction) => {
  //     const unauthorizedResponse = (message?: string) => {
  //       new HttpResponse(
  //         res,
  //         message ? message : "User unauthorized.",
  //         null,
  //         401
  //       ).sendResponse();
  //     };

  //     let authToken = req.headers.authorization;

  //     if (!authToken) {
  //       unauthorizedResponse();
  //       return;
  //     }

  //     if (!authToken.includes("Bearer ")) {
  //       unauthorizedResponse();
  //       return;
  //     }

  //     authToken = authToken.replace("Bearer ", "");

  //     let decodedToken = await this.validateLoginToken(authToken);

  //     if (!decodedToken) {
  //       unauthorizedResponse();
  //       return;
  //     }

  //     decodedToken = decodedToken as UserModel;

  // if (decodedToken["id"]) {
  //   const user = await UserSchema.activeUserById(decodedToken["id"]);
  //   if (!user) {
  //     unauthorizedResponse("User is deactivated.");
  //     return;
  //   }
  // }
  //     if (
  //       decodedToken["userRole"] &&
  //       roles.includes(decodedToken["userRole"])
  //     ) {
  //       res.locals.userData = decodedToken;
  //       next();
  //     } else {
  //       unauthorizedResponse();
  //       return;
  //     }
  //   };
  // }

  static getUserId(res: any) {
    return res.locals.userData.id;
  }
}
