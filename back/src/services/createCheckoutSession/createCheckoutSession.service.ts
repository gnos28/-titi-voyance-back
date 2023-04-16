import { CreateCheckoutSessionService } from "./createCheckoutSession.api";
import { createStripeSessionAdapter } from "./createCheckoutSession.spi";

export const createCheckoutSessionService: CreateCheckoutSessionService = {
  create: async ({
    stripeSecretKey,
    stripeDomain,
    prestationName,
    prestationPrice,
  }) => {
    const sessionUrl = await createStripeSessionAdapter({
      stripeSecretKey,
      stripeDomain,
      prestationName,
      prestationPrice,
    });

    if (!sessionUrl) throw new Error("sessionUrl empty");

    return sessionUrl;
  },
};
