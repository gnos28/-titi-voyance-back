import { importSheet } from "../../utils/importSheet";

export type ImportSheetPort = (sheetId: string | undefined) => Promise<
  {
    [key: string]: string;
  }[]
>;

export const importSheetAdapter: ImportSheetPort = async (
  sheetId: string | undefined
) => await importSheet(sheetId);
