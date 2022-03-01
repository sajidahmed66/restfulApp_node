import { Router } from "express";
import { Banker } from "../entities/Banker";

const router = Router();

router.post("/api/banker", async (req, res) => {
  const { first_name, last_name, email, card_number, employee_number } =
    req.body;
  const banker = Banker.create({
    first_name: first_name,
    last_name: last_name,
    email: email,
    card_number: card_number,
    employee_number: employee_number,
  });
  await banker.save();
  res.send(banker);
});

export { router as createBankerRouter };
