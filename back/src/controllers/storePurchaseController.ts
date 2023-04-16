import { Request, Response } from "express";
import * as dotenv from "dotenv";
import { storePurchaseService } from "../services/storePurchase/storePurchase.service";
import { PurchasingData } from "../services/storePurchase/storePurchase.api";
dotenv.config();

export type ControllerType = {
  [key: string]: (req: Request, res: Response) => Promise<void>;
};

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
