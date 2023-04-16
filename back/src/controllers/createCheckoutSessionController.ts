import { createCheckoutSessionService } from "../services/createCheckoutSession/createCheckoutSession.service";
import { ControllerType, PurchasingData } from "../interfaces";

const createCheckoutSessionController: ControllerType = {};

createCheckoutSessionController.create = async (req, res) => {
  try {
    const { prestationPrice, prestationName } = req.body
      .purchasingData as PurchasingData;

    if (!prestationPrice) throw new Error("prestationPrice empty");
    if (!prestationName) throw new Error("prestationName empty");

    const sessionUrl = await createCheckoutSessionService.create({
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
