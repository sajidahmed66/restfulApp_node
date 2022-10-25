import { Router } from "express";
import { Client } from "../entities/Client";
import { Banker } from "../entities/Banker";

const router = Router();

router.put("/api/banker/:bankerId/client/:clientId", async (req, res) => {
  const { bankerId, clientId } = req.params;
  let banker = await Banker.findOne(parseInt(bankerId));
  let client = await Client.findOne(parseInt(clientId));
  if (!banker || !client) {
    return res.status(400).json({
      error: "Banker or client not found",
    });
  }
  console.log(banker.clients);
  banker.clients = [client];
  console.log(banker.clients);

  await banker.save();
  return res.status(200).json({
    message: "Client added to banker",
  });
});

export { router as connectBankerToclientRouter };
