import { Request, Response } from "express";
import * as dotenv from "dotenv";
import Stripe from "stripe";
import { PurchasingData } from "./storePaypalController";
dotenv.config();

export type ControllerType = {
  [key: string]: (req: Request, res: Response) => Promise<void>;
};

const createCheckoutSessionController: ControllerType = {};

createCheckoutSessionController.store = async (req, res) => {
  try {
    const { prestationPrice, prestationName } = req.body
      .purchasingData as PurchasingData;

    if (!prestationPrice) throw new Error("prestationPrice empty");
    if (!prestationName) throw new Error("prestationName empty");

    const { STRIPE_SECRET_KEY } = process.env;
    if (!STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY empty");

    const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" });

    const { STRIPE_DOMAIN } = process.env;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          //   price: "{{PRICE_ID}}",
          price_data: {
            currency: "eur",
            product_data: { name: prestationName },
            unit_amount: prestationPrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${STRIPE_DOMAIN}?success=true`,
      cancel_url: `${STRIPE_DOMAIN}?canceled=true`,
    });

    const sessionUrl = session.url;

    if (!sessionUrl) throw new Error("sessionUrl empty");

    res.redirect(303, sessionUrl);
  } catch (err: unknown) {
    console.error(err);
    res.sendStatus(500);
  }
};

export default createCheckoutSessionController;
