import {
  GetEventListProps,
  TrimmedEvent,
  importAgenda,
} from "../../utils/importAgenda";

export type importAgendaPort = ({
  calendarId,
  timeMin,
  timeMax,
}: GetEventListProps) => Promise<TrimmedEvent[]>;

export const importAgendaAdapter: importAgendaPort = async ({
  calendarId,
  timeMin,
  timeMax,
}) =>
  await importAgenda.getEventList({
    calendarId,
    timeMin,
    timeMax,
  });
