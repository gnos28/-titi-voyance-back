import { GetAgendaService } from "./getAgenda.api";
import { importAgendaAdapter, importAgendaPort } from "./getAgenda.spi";

const convertEventsToSlots = (
  events: Awaited<ReturnType<importAgendaPort>>
) => {
  const SLOT_DURATION = 30 * 60 * 1000;

  const slots = events
    .map((event) => {
      const { start, end } = event;
      const slots: Date[] = [];
      if (start && end) {
        const startDate = new Date(start);

        const startZero = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          startDate.getHours(),
          startDate.getMinutes() >= 30 ? 30 : 0
        );

        let loopTime = startZero.getTime();
        const maxTime = new Date(end).getTime();

        while (loopTime < maxTime) {
          slots.push(new Date(loopTime));

          loopTime += SLOT_DURATION;
        }
      }
      return slots;
    })
    .flat();

  return slots;
};

export const getAgendaService: GetAgendaService = {
  getAllEvents: async () => {
    const calendarId = process.env.CALENDAR_ID;
    if (calendarId === undefined) throw new Error("calendarId undefined");

    const eventList = await importAgendaAdapter({
      calendarId,
    });

    return eventList;
  },
  getSlotsByDate: async (monthYear: string) => {
    if (monthYear.match(/^\d{4}-\d{2}$/)) {
      const year = parseInt(monthYear.split("-")[0], 10);
      const month = parseInt(monthYear.split("-")[1], 10);

      const timeMin = new Date(year, month - 1, 1).toISOString();
      const timeMax = new Date(year, month, 0).toISOString();

      const calendarId = process.env.CALENDAR_ID;
      if (calendarId === undefined) throw new Error("calendarId undefined");

      const eventList = await importAgendaAdapter({
        calendarId,
        timeMin,
        timeMax,
      });

      return convertEventsToSlots(eventList);
    }
    return [];
  },
};
