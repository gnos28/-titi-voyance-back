import { GetPrestationsService } from "./getPrestations.api";
import { importSheetAdapter } from "./getPrestations.spi";

export const getPrestationsService: GetPrestationsService = async () => {
  const sheetId = process.env.EXPORT_SHEET_ID;
  if (sheetId === undefined) throw new Error("EXPORT_SHEET_ID undefined");

  const tabName = "LISTE_PRESTATIONS";

  const prestations = (await importSheetAdapter({ sheetId, tabName })).map(
    (prestation) => ({
      ...prestation,
      price:
        typeof prestation.price === "string"
          ? parseInt(prestation.price, 10)
          : prestation.price,
      duration:
        typeof prestation.duration === "string"
          ? parseInt(prestation.duration, 10)
          : prestation.duration,
    })
  );

  return prestations;
};
