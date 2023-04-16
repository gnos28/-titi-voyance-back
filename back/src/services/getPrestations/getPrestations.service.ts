import { GetPrestationsService } from "./getPrestations.api";
import { importSheetAdapter } from "./getPrestations.spi";

export const getPrestationsService: GetPrestationsService = async () => {
  const { IMPORT_PRESTATIONS_SHEET_ID } = process.env;

  const prestations = (
    await importSheetAdapter(IMPORT_PRESTATIONS_SHEET_ID)
  ).map((prestation) => ({
    ...prestation,
    price: parseInt(prestation.price),
    duration: parseInt(prestation.duration),
  }));

  return prestations;
};
