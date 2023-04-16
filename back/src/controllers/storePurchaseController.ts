import { storePurchaseService } from "../services/storePurchase/storePurchase.service";
import { ControllerType, PurchasingData } from "../interfaces";

const storePurchaseController: ControllerType = {};

storePurchaseController.store = async (req, res) => {
  try {
    const purchasingData = req.body.purchasingData as PurchasingData;

    await storePurchaseService({ purchasingData });

    res.send({});
  } catch (err: unknown) {
    console.error(err);
    res.sendStatus(500);
  }
};

export { storePurchaseController };
