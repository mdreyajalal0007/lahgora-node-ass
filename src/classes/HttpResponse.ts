import { Response } from "express";

export class HttpResponse {
  constructor(
    private expressResponseObj: Response,
    private message: string = "",
    private result: any = "",
    private statusCode: number = 200
  ) {}

  sendResponse() {
    this.expressResponseObj.status(this.statusCode).json({
      status: this.statusCode,
      message: this.message,
      result: this.result,
    });
  }

  sendErrorResponse(error: any) {
    this.expressResponseObj.status(500).json({
      status: 500,
      message:
        error && error.error && error.error.message
          ? error.error.message
          : error && error.message
          ? error.message
          : "Internal server error",
      error: error,
    });
  }

}
