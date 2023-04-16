import { ControllerType } from "../interfaces";
import { getPrestationsService } from "../services/getPrestations/getPrestations.service";

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
