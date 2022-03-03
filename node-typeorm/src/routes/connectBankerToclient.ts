import { Router } from "express";
import { Client } from "../entities/Client";
import { Banker } from "../entities/Banker";

const router = Router();

router.put("/api/banker/:bankerId/client/:clientId", async (req, res) => {
  const { bankerId, clientId } = req.params;
  const banker = await Banker.findOne(parseInt(bankerId));
  const client = await Client.findOne(parseInt(clientId));
  if (banker && client) {
    banker.clients.push(client);
  }
});
