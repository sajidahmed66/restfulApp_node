import "dotenv/config";
import express from "express";
import { createClientRouter } from "./routes/clientRouter";
import { createBankerRouter } from "./routes/bankerRouter";
import { main } from "./ulits/dbconfig";
import { createTransactionRouter } from "./routes/createTransactions";
import { authRouter } from "./routes/authRouter";
const app = express();

// start from 20:24 laith harb typeorm
main().then(() => {
  app.use(express.json());
  app.use(createClientRouter);
  app.use(createBankerRouter);
  app.use(createTransactionRouter);
  app.use(authRouter);
  app.listen("5000", () => {
    console.log("Server started on port 5000");
  });
});
