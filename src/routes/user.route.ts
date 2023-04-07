import { UserController } from "../controllers";
import express from "express";
import { RequestValidation } from "../classes/RequestValidation";
import { requestValidationConfig } from "../config/requestValidationConfig";
import { Helper } from "../classes/Helper";
import { UserRole } from "../models/user.model";
const userRouter = express.Router();

userRouter.post(
  "/register",
  RequestValidation.validateFunction(requestValidationConfig.register),
  UserController.register
);
userRouter.post(
  "/login",
  RequestValidation.validateFunction(requestValidationConfig.login),
  UserController.login
);
// ---------------------Products----------------------------------
userRouter.post(
  "/add-product/:userId",
  Helper.protectedRoute([UserRole.OWNER]),
  RequestValidation.validateFunction(requestValidationConfig.addProduct),
  UserController.addProduct
);

userRouter.put(
  "/update-product/:Id",
  Helper.protectedRoute([UserRole.OWNER]),
  RequestValidation.validateFunction(requestValidationConfig.updateProduct),
  UserController.updateProduct
);
userRouter.delete(
  "/delete-product/:Id",
  Helper.protectedRoute([UserRole.OWNER]),
  RequestValidation.validateFunction(requestValidationConfig.deleteProduct),
  UserController.deleteProduct
);
userRouter.get(
  "/get-product-list",
  Helper.protectedRoute([UserRole.OWNER]),
  RequestValidation.validateFunction(requestValidationConfig.getProduct),
  UserController.getProduct
);
// ---------------------Products----------------------------------

// ----------------------CARTS-----------------------------------
userRouter.post(
  "/add-cart/:userId",
  Helper.protectedRoute([UserRole.CUSTOMER]),
  RequestValidation.validateFunction(requestValidationConfig.addCart),
  UserController.addCart
);

userRouter.put(
  "/update-cart/:Id",
  Helper.protectedRoute([UserRole.CUSTOMER]),
  RequestValidation.validateFunction(requestValidationConfig.updateCart),
  UserController.updateCart
);
userRouter.delete(
  "/delete-cart/:Id",
  Helper.protectedRoute([UserRole.CUSTOMER]),
  RequestValidation.validateFunction(requestValidationConfig.deleteCart),
  UserController.deleteCart
);
userRouter.get(
  "/get-cart-details",
  Helper.protectedRoute([UserRole.CUSTOMER]),
  RequestValidation.validateFunction(requestValidationConfig.getCart),
  UserController.getCart
);
// ----------------------CARTS-----------------------------------

export default userRouter;
