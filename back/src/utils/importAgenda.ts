import { calendar_v3 } from "googleapis";
import { getAgenda } from "./google";

const trimEventDate = (events: calendar_v3.Schema$Event[]) =>
  events.map((event) => ({
    start: event.start?.dateTime,
    end: event.end?.dateTime,
  }));

export type GetEventListProps = {
  calendarId: string;
  timeMin?: string;
  timeMax?: string;
};

export type TrimmedEvent = {
  start: string | null | undefined;
  end: string | null | undefined;
};

export const importAgenda = {
  getEventList: async ({ calendarId, timeMin, timeMax }: GetEventListProps) => {
    const agenda = getAgenda();

    const eventList = await agenda.events.list({
      calendarId,
      timeMin,
      timeMax,
      singleEvents: timeMin !== undefined && timeMax !== undefined,
    });

    return trimEventDate(eventList.data.items || []) as TrimmedEvent[];
  },
};
