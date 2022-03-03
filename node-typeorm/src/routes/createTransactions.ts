import express from "express";
import { Client } from "../entities/Client";
import { Transaction, TransactionType } from "../entities/Transaction";

const router = express.Router();

router.post("/api/client/:clientId/transaction", async (req, res) => {
  const { clientId } = req.params;
  const { type, amount } = req.body;
  console.log(req.body, parseInt(clientId));
  //find the client by id
  const client = await Client.findOne(parseInt(clientId));
  if (!client) {
    return res.status(400).json({ msg: "Client not found" });
  }

  //create a new transaction
  const transaction = Transaction.create({
    type: type,
    amount: amount,
    client: client,
  });
  await transaction.save();

  //update the client's balance
  if (type === TransactionType.DEPOSIT) {
    client.balance = client.balance + amount;
  }
  if (type === TransactionType.WITHDRAW) {
    client.balance = client.balance - amount;
  }
  await client.save();
  return res.status(200).json({
    msg: "Transaction created",
    transaction,
    balance: client.balance,
  });
});

export { router as createTransactionRouter };
