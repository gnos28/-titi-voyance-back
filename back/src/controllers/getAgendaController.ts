import { ControllerType } from "../interfaces";
import { getAgendaService } from "../services/getAgenda/getAgenda.service";

const getAgendaController: ControllerType = {};

getAgendaController.getAll = async (req, res) => {
  try {
    const allEvents = await getAgendaService.getAllEvents();
    res.send(allEvents);
  } catch (err: unknown) {
    console.error(err);
    res.sendStatus(500);
  }
};

getAgendaController.getByDate = async (req, res) => {
  try {
    const monthYear = req.body.monthYear as string | undefined;
    if (monthYear === undefined) throw new Error("monthYear undefined");

    const slots = await getAgendaService.getSlotsByDate(monthYear);
    res.send({ slots });
  } catch (err: unknown) {
    console.error(err);
    res.sendStatus(500);
  }
};

export default getAgendaController;
