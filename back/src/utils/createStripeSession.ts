import Stripe from "stripe";

export type CreateStripeSessionProps = {
  stripeSecretKey: string;
  stripeDomain: string;
  prestationName: string;
  prestationPrice: number;
};

export const createStripeSession = async ({
  stripeSecretKey,
  stripeDomain,
  prestationName,
  prestationPrice,
}: CreateStripeSessionProps) => {
  const stripe = new Stripe(stripeSecretKey, { apiVersion: "2022-11-15" });

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
    success_url: `${stripeDomain}?success=true`,
    cancel_url: `${stripeDomain}?canceled=true`,
  });

  return session;
};
