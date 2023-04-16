import { calendar_v3, google } from "googleapis";

const getAuth = () =>
  new google.auth.GoogleAuth({
    keyFile: "./auth.json",
    scopes: [
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/calendar.events",
    ],
  });

const getGoogleAgenda = () => {
  const auth = getAuth();

  const agenda = google.calendar({
    version: "v3",
    auth,
  });

  return agenda;
};

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
    const agenda = getGoogleAgenda();

    const eventList = await agenda.events.list({
      calendarId,
      timeMin,
      timeMax,
      singleEvents: timeMin !== undefined && timeMax !== undefined,
    });

    return trimEventDate(eventList.data.items || []) as TrimmedEvent[];
  },
};
