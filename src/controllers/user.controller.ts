import { Request, Response } from "express";
import { HttpResponse } from "../classes/HttpResponse";
import { HttpStatuses } from "../interfaces/IHttpStatuses";
import { UserService } from "../services/user.service";

export const register = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      name: body.name,
      emailId: body.emailId,
      mobileNumber: body.mobileNumber,
      country: body.country,
      storeName: body.storeName,
      password: body.password,
      userRole: body.userRole,
    };
    UserService.register(data, (result: any) => {
      console.log(result, "-------999999");
      new HttpResponse(
        res,
        result === "true"
          ? "User registered successfully."
          : result === "false"
          ? "Error while creating user."
          : result === "exist"
          ? "Email id already exist"
          : "Error while creating user.",
        result,
        result === "true"
          ? HttpStatuses.CREATE
          : result === "false"
          ? HttpStatuses.BAD_REQUEST
          : result === "exist"
          ? HttpStatuses.CONFLICT
          : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      emailId: body.emailId,
      password: body.password,
    };
    UserService.login(data, (result: any) => {
      new HttpResponse(
        res,
        result ? "Welcome to Lahagora e-com." : "Wrong username or password.",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const getData = async (req: Request, res: Response) => {
  console.log("hhhhhhhhhhhh");
  try {
    UserService.getData((result: any) => {
      console.log("hhhhhhhhhhhh");

      new HttpResponse(
        res,
        result ? "Welcome to ---------." : "Wrong username or password.",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};
