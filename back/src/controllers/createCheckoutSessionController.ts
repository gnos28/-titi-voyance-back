import { Request, Response } from "express";
import * as dotenv from "dotenv";
import { PurchasingData } from "../services/storePurchase/storePurchase.api";
import { createCheckoutSessionService } from "../services/createCheckoutSession/createCheckoutSession.service";
dotenv.config();

export type ControllerType = {
  [key: string]: (req: Request, res: Response) => Promise<void>;
};

const createCheckoutSessionController: ControllerType = {};

createCheckoutSessionController.create = async (req, res) => {
  try {
    const { prestationPrice, prestationName } = req.body
      .purchasingData as PurchasingData;

    if (!prestationPrice) throw new Error("prestationPrice empty");
    if (!prestationName) throw new Error("prestationName empty");

    const { STRIPE_SECRET_KEY } = process.env;
    if (!STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY empty");
    const { STRIPE_DOMAIN } = process.env;
    if (!STRIPE_DOMAIN) throw new Error("STRIPE_DOMAIN empty");

    const sessionUrl = await createCheckoutSessionService.create({
      stripeSecretKey: STRIPE_SECRET_KEY,
      stripeDomain: STRIPE_DOMAIN,
      prestationName,
      prestationPrice,
    });

    res.send({ url: sessionUrl });
  } catch (err: unknown) {
    console.error(err);
    res.sendStatus(500);
  }
};

export default createCheckoutSessionController;
