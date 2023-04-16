export type GetPrestationsService = () => Promise<
  {
    price: number;
    duration: number;
  }[]
>;
