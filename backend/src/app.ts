import "dotenv/config";

import express, { NextFunction, Request, Response } from "express";
import courseRouter from "./routes/courses";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/courses", courseRouter);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint Not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occurred.";
  let statusCode = 500;
  if (isHttpError(error)) {
    errorMessage = error.message;
    statusCode = error.status;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
