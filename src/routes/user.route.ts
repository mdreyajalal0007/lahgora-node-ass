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

userRouter.get(
  "/get-data",
  // RequestValidation.validateFunction(requestValidationConfig.register),
  UserController.getData
);



export default userRouter;
