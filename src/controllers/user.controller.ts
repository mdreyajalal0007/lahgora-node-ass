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

export const addProduct = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      productName: body.productName,
      description: body.description,
      image: body.description,
      price: body.price,
      quantity: body.quantity,
    };
    UserService.addProduct(data, req.params.userId, (result: any) => {
      new HttpResponse(
        res,
        result ? "Product added successfully." : "Error while adding products.",
        result,
        result ? HttpStatuses.CREATE : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      productName: body.productName,
      description: body.description,
      image: body.description,
      price: body.price,
      quantity: body.quantity,
    };
    UserService.updateProduct(data, req.params.Id, (result: any) => {
      new HttpResponse(
        res,
        result
          ? "Product updated successfully."
          : "Error while updating products.",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    UserService.deleteProduct(req.params.Id, (result: any) => {
      new HttpResponse(
        res,
        result
          ? "Product deleted successfully."
          : "Error while deleting products.",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    UserService.getProduct(req.query.userId, req.query.Id, (result: any) => {
      new HttpResponse(
        res,
        result.length === 0
          ? "No records found."
          : result.length >= 1
          ? "Product fetched successfully."
          : "Error while fetching product details.",
        result,
        result.length >= 0 ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};
