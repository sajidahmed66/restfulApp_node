import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import { createClientRouter } from "./routes/clientRouter";
import { createBankerRouter } from "./routes/bankerRouter";
import { main } from "./ulits/dbconfig";
import { createTransactionRouter } from "./routes/createTransactions";
import { connectBankerToclientRouter } from "./routes/connectBankerToclient";
import { authRouter } from "./routes/authRouter";
import { uploadRouter } from "./routes/uploadRouter";
const app = express();

// start from 20:24 laith harb typeorm
main().then(() => {
  app.use(express.json());
  app.use(createClientRouter);
  app.use(createBankerRouter);
  app.use(createTransactionRouter);
  app.use(authRouter);
  app.use(connectBankerToclientRouter);
  app.use(uploadRouter);
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof multer.MulterError) {
      res.status(500).json({
        message: error.code,
      });
    } else {
      res.status(500).json({
        message: error.message,
      });
    }
  });
  app.listen("5000", () => {
    console.log("Server started on port 5000");
  });
});

/**
 better error handler 
 app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "file is too large",
      });
    }

    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        message: "File limit reached",
      });
    }

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        message: "File must be an image",
      });
    }
  }
});
 */
