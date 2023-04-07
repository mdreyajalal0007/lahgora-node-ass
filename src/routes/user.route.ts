import { UserController } from "../controllers";
import express from "express";
import { RequestValidation } from "../classes/RequestValidation";
import { requestValidationConfig } from "../config/requestValidationConfig";
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
  RequestValidation.validateFunction(requestValidationConfig.addProduct),
  UserController.addProduct
);

userRouter.put(
  "/update-product/:Id",
  RequestValidation.validateFunction(requestValidationConfig.updateProduct),
  UserController.updateProduct
);
userRouter.delete(
  "/delete-product/:Id",
  RequestValidation.validateFunction(requestValidationConfig.deleteProduct),
  UserController.deleteProduct
);
userRouter.get(
  "/get-product-list",
  RequestValidation.validateFunction(requestValidationConfig.getProduct),
  UserController.getProduct
);
// ---------------------Products----------------------------------
userRouter.get(
  "/get-data",
  // RequestValidation.validateFunction(requestValidationConfig.register),
  UserController.getData
);

export default userRouter;
