import { GetPrestationsService } from "./getPrestations.api";
import { importSheetAdapter } from "./getPrestations.spi";

export const getPrestationsService: GetPrestationsService = async () => {
  const sheetId = process.env.EXPORT_SHEET_ID;
  if (sheetId === undefined) throw new Error("EXPORT_SHEET_ID undefined");

  const tabName = "LISTE_PRESTATIONS";

  const prestations = (await importSheetAdapter({ sheetId, tabName })).map(
    (prestation) => ({
      ...prestation,
      price: parseInt(prestation.price),
      duration: parseInt(prestation.duration),
    })
  );

  return prestations;
};
