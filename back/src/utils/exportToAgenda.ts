import { getAgenda } from "./google";

type ExportToAgendaProps = {
  start: string;
  end: string;
};

export const exportToAgenda = async ({ start, end }: ExportToAgendaProps) => {
  const agenda = getAgenda();

  const agendaInsertRes = await agenda.events.insert({
    calendarId: process.env.CALENDAR_ID,
    conferenceDataVersion: 0,
    sendNotifications: true,
    sendUpdates: "all",
    supportsAttachments: false,
    requestBody: {
      // request body parameters
      // {
      //   "anyoneCanAddSelf": false,
      //   "attachments": [],
      //   "attendees": [],
      //   "attendeesOmitted": false,
      //   "colorId": "my_colorId",
      //   "conferenceData": {},
      //   "created": "my_created",
      //   "creator": {},
      description: "my_description",
      end: {
        dateTime: end,
      },
      //   "endTimeUnspecified": false,
      //   "etag": "my_etag",
      //   "eventType": "my_eventType",
      //   "extendedProperties": {},
      //   "gadget": {},
      guestsCanInviteOthers: false,
      guestsCanModify: false,
      guestsCanSeeOtherGuests: false,
      //   "hangoutLink": "my_hangoutLink",
      //   "htmlLink": "my_htmlLink",
      //   "iCalUID": "my_iCalUID",
      //   "id": "my_id",
      //   "kind": "my_kind",
      //   "location": "my_location",
      //   "locked": false,
      //   "organizer": {},
      //   "originalStartTime": {},
      //   "privateCopy": false,
      //   "recurrence": [],
      //   "recurringEventId": "my_recurringEventId",
      //   "reminders": {},
      //   "sequence": 0,
      //   "source": {},
      start: {
        dateTime: start,
      },
      //   "status": "my_status",
      summary: "TITRE",
      //   "transparency": "my_transparency",
      //   "updated": "my_updated",
      //   "visibility": "my_visibility"
      // }
    },
  });

  console.log("agendaInsertRes", agendaInsertRes);
};
