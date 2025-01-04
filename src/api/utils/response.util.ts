import { Response } from "express";

type statusCode = 200 | 201 | 400 | 401 | 404 | 500;

export const sendResponse = (
  res: Response,
  data: any,
  statusCode?: statusCode
) => {
  return res.status(statusCode || 200).json({ data: data }) as any;
};

export const sendErrorResponse = (
  res: Response,
  error: any,
  statusCode?: statusCode
) => {
  return res.status(statusCode || 500).json({ error }) as any;
};
