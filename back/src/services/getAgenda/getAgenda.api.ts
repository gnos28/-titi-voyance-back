export type GetAgendaService = {
  getAllEvents: () => Promise<
    {
      start: string | null | undefined;
      end: string | null | undefined;
    }[]
  >;
  getSlotsByDate: (monthYear: string) => Promise<Date[]>;
};
