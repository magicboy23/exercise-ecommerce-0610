import { getSampleService } from "../services/sample/get-sample.service";
import { NextFunction, Request, Response } from "express";
export const getSamplesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getSampleService();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
