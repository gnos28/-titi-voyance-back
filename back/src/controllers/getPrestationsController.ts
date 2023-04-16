import { Request, Response } from "express";
import { getPrestationsService } from "../services/getPrestations/getPrestations.service";

export type ControllerType = {
  [key: string]: (req: Request, res: Response) => Promise<void>;
};

const getPrestationsController: ControllerType = {};

getPrestationsController.getAll = async (req, res) => {
  try {
    const prestations = await getPrestationsService();
    res.send({ prestations });
  } catch (err: unknown) {
    console.error(err);
    res.sendStatus(500);
  }
};

export default getPrestationsController;
