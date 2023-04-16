type CreateProps = {
  prestationName: string;
  prestationPrice: number;
};

export type CreateCheckoutSessionService = {
  create: ({ prestationName, prestationPrice }: CreateProps) => Promise<string>;
};
