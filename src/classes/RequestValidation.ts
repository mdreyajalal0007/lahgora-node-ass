import express from "express";
import { ValidationChain, validationResult } from "express-validator";
import { HttpResponse } from "./HttpResponse";

export class RequestValidation {
  static validateFunction = (validations: ValidationChain[]) => {
    return async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      await Promise.all(validations.map((validation) => validation.run(req)));

      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }

      let errorMessage:any = null;
      if (errors.array() && errors.array().length) {
        errorMessage = errors.array()[0].msg;
      }

      new HttpResponse(res, errorMessage, errors.array(), 400).sendResponse();
    };
  };
}
