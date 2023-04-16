import {
  CreateStripeSessionProps,
  createStripeSession,
} from "../../utils/createStripeSession";

export type createStripeSessionPort = ({
  stripeSecretKey,
  stripeDomain,
  prestationName,
  prestationPrice,
}: CreateStripeSessionProps) => Promise<string | null>;

export const createStripeSessionAdapter: createStripeSessionPort = async ({
  stripeSecretKey,
  stripeDomain,
  prestationName,
  prestationPrice,
}) =>
  (
    await createStripeSession({
      stripeSecretKey,
      stripeDomain,
      prestationName,
      prestationPrice,
    })
  ).url;
