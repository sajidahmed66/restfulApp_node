import { createConnection } from "typeorm";
import { Client } from "../entities/Client";
import { Banker } from "../entities/Banker";
import { Transaction } from "../entities/Transaction";
import { Auth } from "../entities/Auth";

export const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Client, Banker, Transaction, Auth],
      synchronize: true,
    });
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
    // throw new Error("Unable to connect to database");
  }
};
