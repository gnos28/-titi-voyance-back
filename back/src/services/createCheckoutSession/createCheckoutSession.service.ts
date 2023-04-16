import { CreateCheckoutSessionService } from "./createCheckoutSession.api";
import { createStripeSessionAdapter } from "./createCheckoutSession.spi";

export const createCheckoutSessionService: CreateCheckoutSessionService = {
  create: async ({ prestationName, prestationPrice }) => {
    const { STRIPE_SECRET_KEY } = process.env;
    if (!STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY empty");
    const { STRIPE_DOMAIN } = process.env;
    if (!STRIPE_DOMAIN) throw new Error("STRIPE_DOMAIN empty");

    const sessionUrl = await createStripeSessionAdapter({
      stripeSecretKey: STRIPE_SECRET_KEY,
      stripeDomain: STRIPE_DOMAIN,
      prestationName,
      prestationPrice,
    });

    if (!sessionUrl) throw new Error("sessionUrl empty");

    return sessionUrl;
  },
};
