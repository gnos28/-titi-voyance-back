type CreateProps = {
  stripeSecretKey: string;
  stripeDomain: string;
  prestationName: string;
  prestationPrice: number;
};

export type CreateCheckoutSessionService = {
  create: ({
    stripeSecretKey,
    stripeDomain,
    prestationName,
    prestationPrice,
  }: CreateProps) => Promise<string>;
};
